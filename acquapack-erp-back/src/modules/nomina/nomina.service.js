const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con nómina
 */
class NominaService {
	/**
	 * Obtiene todas las nóminas con información del trabajador
	 * @returns {Promise<Array>} Lista de nóminas
	 */
	async obtenerNominas() {
		try {
			const result = await pool.query(`
				SELECT 
					n.id_nomina,
					n.id_usuario_trabajador,
					n.total_bruto_nomina,
					n.periodo_inicio,
					n.periodo_fin,
					n.fecha_nomina,
					n.id_estado,
					n.id_usuario_creador,
					n.total_deducciones,
					n.total_pagar,
					n.valor_auxilio_transporte,
					n.dias_trabajados,
					n.observaciones,
					n.fecha_creacion,
					u.nombre || ' ' || u.apellido as nombre_trabajador,
					u.documento as documento_trabajador,
					e.nombre as estado_nombre,
					e.color as estado_color,
					u_creador.nombre || ' ' || u_creador.apellido as nombre_creador
				FROM public.nomina n
				LEFT JOIN public.usuarios u ON n.id_usuario_trabajador = u.id_usuarios
				LEFT JOIN public.estado e ON n.id_estado = e.id_estado
				LEFT JOIN public.usuarios u_creador ON n.id_usuario_creador = u_creador.id_usuarios
				ORDER BY n.fecha_nomina DESC, n.id_nomina DESC
			`);
			logger.info({ count: result.rows.length }, "Nóminas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener nóminas");
			throw error;
		}
	}

	/**
	 * Obtiene una nómina por ID con todos sus detalles
	 * @param {number} idNomina - ID de la nómina
	 * @returns {Promise<Object>} Nómina con detalles
	 */
	async obtenerNominaPorId(idNomina) {
		try {
			// Obtener nómina principal
			const nominaResult = await pool.query(`
				SELECT 
					n.id_nomina,
					n.id_usuario_trabajador,
					n.total_bruto_nomina,
					n.periodo_inicio,
					n.periodo_fin,
					n.fecha_nomina,
					n.id_estado,
					n.id_usuario_creador,
					n.total_deducciones,
					n.total_pagar,
					n.valor_auxilio_transporte,
					n.dias_trabajados,
					n.observaciones,
					n.fecha_creacion,
					u.nombre || ' ' || u.apellido as nombre_trabajador,
					u.documento as documento_trabajador,
					e.nombre as estado_nombre,
					e.color as estado_color,
					u_creador.nombre || ' ' || u_creador.apellido as nombre_creador
				FROM public.nomina n
				LEFT JOIN public.usuarios u ON n.id_usuario_trabajador = u.id_usuarios
				LEFT JOIN public.estado e ON n.id_estado = e.id_estado
				LEFT JOIN public.usuarios u_creador ON n.id_usuario_creador = u_creador.id_usuarios
				WHERE n.id_nomina = $1
			`, [idNomina]);

			if (nominaResult.rows.length === 0) {
				throw new Error("Nómina no encontrada");
			}

			const nomina = nominaResult.rows[0];

			// Obtener detalles de horas
			const detallesHorasResult = await pool.query(`
				SELECT 
					dn.id_detalle_nomina,
					dn.id_nomina,
					dn.id_tipo_hora,
					dn.valor_hora,
					dn.cantidad_horas,
					dn.total,
					th.nombre as tipo_hora_nombre,
					th.horario,
					th.recargo
				FROM public.detalle_nomina dn
				LEFT JOIN public.tipo_hora th ON dn.id_tipo_hora = th.id_tipo_hora
				WHERE dn.id_nomina = $1
				ORDER BY dn.id_detalle_nomina
			`, [idNomina]);

			// Obtener detalles de deducciones
			const detallesDeduccionesResult = await pool.query(`
				SELECT 
					dd.id_detalle_deducciones,
					dd.id_nomina,
					dd.id_tipo_deduccion,
					dd.valor_deduccion,
					dd.observaciones,
					td.nombre as tipo_deduccion_nombre,
					td.descripcion as tipo_deduccion_descripcion
				FROM public.detalle_deducciones dd
				LEFT JOIN public.tipo_deduccion td ON dd.id_tipo_deduccion = td.id_tipo_deduccion
				WHERE dd.id_nomina = $1
				ORDER BY dd.id_detalle_deducciones
			`, [idNomina]);

			nomina.detalles_horas = detallesHorasResult.rows;
			nomina.detalles_deducciones = detallesDeduccionesResult.rows;

			logger.info({ nominaId: idNomina }, "Nómina obtenida exitosamente");
			return nomina;
		} catch (error) {
			logger.error({ err: error, idNomina }, "Error al obtener nómina por ID");
			throw error;
		}
	}

	/**
	 * Crea una nueva nómina con sus detalles
	 * @param {Object} datosNomina - Datos de la nómina
	 * @returns {Promise<Object>} Nómina creada
	 */
	async crearNomina(datosNomina) {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");

			// Calcular totales
			const totalBrutoNomina = datosNomina.detalles_horas?.reduce((sum, detalle) => {
				const cantidadHoras = parseFloat(detalle.cantidad_horas) || 0;
				const valorHora = parseFloat(detalle.valor_hora) || 0;
				return sum + (cantidadHoras * valorHora);
			}, 0) || 0;

			const totalDeducciones = datosNomina.detalles_deducciones?.reduce((sum, deduccion) => {
				return sum + (parseFloat(deduccion.valor_deduccion) || 0);
			}, 0) || 0;

			const diasTrabajados = parseInt(datosNomina.dias_trabajados, 10) || 0;
			let valorAuxilioTransporte;
			if (diasTrabajados > 0) {
				const vigenteResult = await client.query(`
					SELECT valor FROM public.valor_auxilio_transporte WHERE id = 1
				`);
				const valorPorDia = vigenteResult.rows.length > 0 ? parseFloat(vigenteResult.rows[0].valor) || 0 : 0;
				valorAuxilioTransporte = Math.round(valorPorDia * diasTrabajados * 100) / 100;
			} else {
				valorAuxilioTransporte = parseFloat(datosNomina.valor_auxilio_transporte) || 0;
			}
			const totalPagar = totalBrutoNomina - totalDeducciones + valorAuxilioTransporte;

			// Sincronizar secuencia de id_nomina antes de insertar (por si está desincronizada)
			await client.query(`
				SELECT setval(
					pg_get_serial_sequence('public.nomina', 'id_nomina'),
					COALESCE((SELECT MAX(id_nomina) FROM public.nomina), 0) + 1,
					false
				)
			`);

			// Insertar nómina principal
			const nominaResult = await client.query(`
				INSERT INTO public.nomina (
					id_usuario_trabajador,
					periodo_inicio,
					periodo_fin,
					fecha_nomina,
					id_estado,
					total_bruto_nomina,
					total_deducciones,
					valor_auxilio_transporte,
					total_pagar,
					id_usuario_creador,
					observaciones,
					dias_trabajados
				) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
				RETURNING id_nomina
			`, [
				datosNomina.id_usuario_trabajador,
				datosNomina.periodo_inicio,
				datosNomina.periodo_fin,
				datosNomina.fecha_nomina || new Date().toISOString().split('T')[0],
				datosNomina.id_estado,
				totalBrutoNomina,
				totalDeducciones,
				valorAuxilioTransporte,
				totalPagar,
				datosNomina.id_usuario_creador,
				datosNomina.observaciones || null,
				diasTrabajados || null
			]);

			const idNomina = nominaResult.rows[0].id_nomina;

			// Insertar detalles de horas
			if (datosNomina.detalles_horas && datosNomina.detalles_horas.length > 0) {
				for (const detalle of datosNomina.detalles_horas) {
					const cantidadHoras = parseFloat(detalle.cantidad_horas) || 0;
					const valorHora = parseFloat(detalle.valor_hora) || 0;
					const total = cantidadHoras * valorHora;

					await client.query(`
						INSERT INTO public.detalle_nomina (
							id_nomina,
							id_tipo_hora,
							cantidad_horas,
							valor_hora,
							total
						) VALUES ($1, $2, $3, $4, $5)
					`, [
						idNomina,
						detalle.id_tipo_hora,
						cantidadHoras,
						valorHora,
						total
					]);
				}
			}

			// Insertar detalles de deducciones
			if (datosNomina.detalles_deducciones && datosNomina.detalles_deducciones.length > 0) {
				for (const deduccion of datosNomina.detalles_deducciones) {
					await client.query(`
						INSERT INTO public.detalle_deducciones (
							id_nomina,
							id_tipo_deduccion,
							valor_deduccion,
							observaciones
						) VALUES ($1, $2, $3, $4)
					`, [
						idNomina,
						deduccion.id_tipo_deduccion,
						parseFloat(deduccion.valor_deduccion) || 0,
						deduccion.observaciones || null
					]);
				}
			}

			await client.query("COMMIT");

			// Obtener la nómina completa creada
			const nominaCompleta = await this.obtenerNominaPorId(idNomina);

			logger.info({ idNomina }, "Nómina creada exitosamente");
			return nominaCompleta;
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error, message: error.message, code: error.code }, "Error al crear nómina");
			
			// Mejorar el mensaje de error para claves duplicadas
			if (error.code === '23505') { // Código de violación de restricción única
				const errorMessage = error.message || 'Error de clave duplicada';
				if (errorMessage.includes('id_nomina')) {
					throw new Error('Error: La secuencia de ID de nómina está desincronizada. Contacte al administrador.');
				} else if (errorMessage.includes('detalle_nomina')) {
					throw new Error('Error: Problema al insertar detalles de horas. Intente nuevamente.');
				} else if (errorMessage.includes('detalle_deducciones')) {
					throw new Error('Error: Problema al insertar detalles de deducciones. Intente nuevamente.');
				}
				throw new Error(`Error de clave duplicada: ${errorMessage}`);
			}
			
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene todos los trabajadores (usuarios activos)
	 * @returns {Promise<Array>} Lista de trabajadores
	 */
	async obtenerTrabajadores() {
		try {
			const result = await pool.query(`
				SELECT 
					id_usuarios,
					documento,
					nombre,
					apellido,
					nombre || ' ' || apellido as nombre_completo
				FROM public.usuarios
				WHERE id_estado IN (
					SELECT id_estado FROM public.estado 
					WHERE nombre ILIKE '%activo%' AND (modulo = 'Usuarios' OR modulo = 'Global')
				)
				ORDER BY nombre, apellido
			`);

			logger.info({ count: result.rows.length }, "Trabajadores obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener trabajadores");
			throw error;
		}
	}

	/**
	 * Obtiene los estados de nómina (24-29)
	 * @returns {Promise<Array>} Lista de estados
	 */
	async obtenerEstadosNomina() {
		try {
			const result = await pool.query(`
				SELECT 
					id_estado,
					nombre,
					color
				FROM public.estado
				WHERE id_estado BETWEEN 24 AND 29
				ORDER BY id_estado
			`);

			logger.info({ count: result.rows.length }, "Estados de nómina obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener estados de nómina");
			throw error;
		}
	}

	/**
	 * Obtiene todos los tipos de hora
	 * @returns {Promise<Array>} Lista de tipos de hora
	 */
	async obtenerTiposHora() {
		try {
			const result = await pool.query(`
				SELECT 
					th.id_tipo_hora,
					th.nombre,
					th.horario,
					th.recargo,
					th.valor_hora,
					th.id_estado
				FROM public.tipo_hora th
				WHERE th.id_estado IN (
					SELECT id_estado FROM public.estado 
					WHERE nombre ILIKE '%activo%' AND (modulo = 'Nómina' OR modulo = 'Global')
				)
				ORDER BY th.id_tipo_hora
			`);
			logger.info({ count: result.rows.length }, "Tipos de hora obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de hora");
			throw error;
		}
	}

	/**
	 * Obtiene todos los tipos de deducción
	 * @returns {Promise<Array>} Lista de tipos de deducción
	 */
	async obtenerTiposDeduccion() {
		try {
			const result = await pool.query(`
				SELECT 
					td.id_tipo_deduccion,
					td.nombre,
					td.descripcion,
					td.id_estado
				FROM public.tipo_deduccion td
				WHERE td.id_estado IN (
					SELECT id_estado FROM public.estado 
					WHERE nombre ILIKE '%activo%' AND (modulo = 'Nómina' OR modulo = 'Global')
				)
				ORDER BY td.nombre
			`);
			logger.info({ count: result.rows.length }, "Tipos de deducción obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de deducción");
			throw error;
		}
	}

	/**
	 * Obtiene el correo electrónico del trabajador de una nómina
	 * @param {number} idNomina - ID de la nómina
	 * @returns {Promise<string|null>} Correo electrónico del trabajador
	 */
	async obtenerEmailTrabajador(idNomina) {
		try {
			const result = await pool.query(`
				SELECT u.correo_electronico
				FROM public.nomina n
				LEFT JOIN public.usuarios u ON n.id_usuario_trabajador = u.id_usuarios
				WHERE n.id_nomina = $1
			`, [idNomina]);

			if (result.rows.length === 0) {
				throw new Error("Nómina no encontrada");
			}

			return result.rows[0].correo_electronico || null;
		} catch (error) {
			logger.error({ err: error, idNomina }, "Error al obtener email del trabajador");
			throw error;
		}
	}
}

module.exports = new NominaService();
