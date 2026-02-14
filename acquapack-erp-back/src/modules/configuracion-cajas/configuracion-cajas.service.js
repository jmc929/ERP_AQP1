const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones de configuración de cajas
 */
class ConfiguracionCajasService {
	// ========== TIPO MOVIMIENTO ==========

	/**
	 * Obtiene todos los tipos de movimiento
	 * @returns {Promise<Array>} Lista de tipos de movimiento
	 */
	async obtenerTiposMovimiento() {
		try {
			const result = await pool.query(
				"SELECT id_tipo_movimiento, nombre FROM public.tipo_movimiento ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Tipos de movimiento obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de movimiento");
			throw error;
		}
	}

	/**
	 * Crea un nuevo tipo de movimiento
	 * @param {Object} datosTipoMovimiento - Datos del tipo de movimiento
	 * @returns {Promise<Object>} Tipo de movimiento creado
	 */
	async crearTipoMovimiento(datosTipoMovimiento) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_tipo_movimiento FROM public.tipo_movimiento WHERE nombre = $1",
				[datosTipoMovimiento.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de movimiento con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.tipo_movimiento (nombre) VALUES ($1) RETURNING id_tipo_movimiento, nombre",
				[datosTipoMovimiento.nombre]
			);

			logger.info({ tipoMovimientoId: result.rows[0].id_tipo_movimiento }, "Tipo de movimiento creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de movimiento");
			throw error;
		}
	}

	/**
	 * Actualiza un tipo de movimiento
	 * @param {number} id - ID del tipo de movimiento
	 * @param {Object} datosTipoMovimiento - Datos actualizados
	 * @returns {Promise<Object>} Tipo de movimiento actualizado
	 */
	async actualizarTipoMovimiento(id, datosTipoMovimiento) {
		try {
			// Validar que el tipo de movimiento exista
			const tipoExistente = await pool.query(
				"SELECT id_tipo_movimiento FROM public.tipo_movimiento WHERE id_tipo_movimiento = $1",
				[id]
			);

			if (tipoExistente.rows.length === 0) {
				throw new Error("Tipo de movimiento no encontrado");
			}

			// Validar que el nombre no exista en otro tipo de movimiento
			if (datosTipoMovimiento.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_movimiento FROM public.tipo_movimiento WHERE nombre = $1 AND id_tipo_movimiento != $2",
					[datosTipoMovimiento.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de movimiento con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.tipo_movimiento SET nombre = $1 WHERE id_tipo_movimiento = $2 RETURNING id_tipo_movimiento, nombre",
				[datosTipoMovimiento.nombre, id]
			);

			logger.info({ tipoMovimientoId: id }, "Tipo de movimiento actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar tipo de movimiento");
			throw error;
		}
	}

	/**
	 * Elimina un tipo de movimiento
	 * @param {number} id - ID del tipo de movimiento
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarTipoMovimiento(id) {
		try {
			// Verificar si hay movimientos usando este tipo
			const movimientos = await pool.query(
				"SELECT id_movimiento_caja FROM public.movimiento_caja WHERE id_tipo_movimiento = $1 LIMIT 1",
				[id]
			);

			if (movimientos.rows.length > 0) {
				throw new Error("No se puede eliminar este tipo de movimiento porque tiene movimientos asociados");
			}

			const result = await pool.query(
				"DELETE FROM public.tipo_movimiento WHERE id_tipo_movimiento = $1 RETURNING id_tipo_movimiento",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de movimiento no encontrado");
			}

			logger.info({ tipoMovimientoId: id }, "Tipo de movimiento eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar tipo de movimiento");
			throw error;
		}
	}

	// ========== CAJAS ==========

	/**
	 * Obtiene todas las cajas
	 * @returns {Promise<Array>} Lista de cajas
	 */
	async obtenerCajas() {
		try {
			const query = `
				SELECT 
					c.*,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.cajas c
				LEFT JOIN public.estado e ON c.id_estado = e.id_estado
				ORDER BY c.id_caja DESC
			`;

			const result = await pool.query(query);
			logger.info({ count: result.rows.length }, "Cajas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener cajas");
			throw error;
		}
	}

	/**
	 * Crea una nueva caja
	 * @param {Object} datosCaja - Datos de la caja
	 * @returns {Promise<Object>} Caja creada
	 */
	async crearCaja(datosCaja) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_caja FROM public.cajas WHERE nombre = $1",
				[datosCaja.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una caja con este nombre");
			}

			const result = await pool.query(
				`INSERT INTO public.cajas (nombre, descripcion, saldo_actual, id_estado) 
				 VALUES ($1, $2, $3, $4) 
				 RETURNING id_caja, nombre, descripcion, saldo_actual, id_estado`,
				[
					datosCaja.nombre,
					datosCaja.descripcion || null,
					datosCaja.saldo_actual || 0.00,
					datosCaja.id_estado
				]
			);

			logger.info({ cajaId: result.rows[0].id_caja }, "Caja creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear caja");
			throw error;
		}
	}

	/**
	 * Actualiza una caja
	 * @param {number} id - ID de la caja
	 * @param {Object} datosCaja - Datos actualizados
	 * @returns {Promise<Object>} Caja actualizada
	 */
	async actualizarCaja(id, datosCaja) {
		try {
			// Validar que la caja exista
			const cajaExistente = await pool.query(
				"SELECT id_caja FROM public.cajas WHERE id_caja = $1",
				[id]
			);

			if (cajaExistente.rows.length === 0) {
				throw new Error("Caja no encontrada");
			}

			// Validar que el nombre no exista en otra caja
			if (datosCaja.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_caja FROM public.cajas WHERE nombre = $1 AND id_caja != $2",
					[datosCaja.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra caja con este nombre");
				}
			}

			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosCaja.nombre !== undefined) {
				campos.push(`nombre = $${contador}`);
				valores.push(datosCaja.nombre);
				contador++;
			}

			if (datosCaja.descripcion !== undefined) {
				campos.push(`descripcion = $${contador}`);
				valores.push(datosCaja.descripcion);
				contador++;
			}

			if (datosCaja.saldo_actual !== undefined) {
				campos.push(`saldo_actual = $${contador}`);
				valores.push(datosCaja.saldo_actual);
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(id);
			const query = `
				UPDATE public.cajas 
				SET ${campos.join(", ")}
				WHERE id_caja = $${contador}
				RETURNING id_caja, nombre, descripcion, saldo_actual, id_estado
			`;

			const result = await pool.query(query, valores);

			logger.info({ cajaId: id }, "Caja actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar caja");
			throw error;
		}
	}

	/**
	 * Archiva una caja (cambia su estado)
	 * @param {number} id - ID de la caja
	 * @param {number} idEstado - ID del nuevo estado
	 * @returns {Promise<Object>} Caja actualizada
	 */
	async archivarCaja(id, idEstado) {
		try {
			// Validar que la caja exista
			const cajaExistente = await pool.query(
				"SELECT id_caja FROM public.cajas WHERE id_caja = $1",
				[id]
			);

			if (cajaExistente.rows.length === 0) {
				throw new Error("Caja no encontrada");
			}

			const result = await pool.query(
				"UPDATE public.cajas SET id_estado = $1 WHERE id_caja = $2 RETURNING id_caja, nombre, descripcion, saldo_actual, id_estado",
				[idEstado, id]
			);

			logger.info({ cajaId: id, nuevoEstado: idEstado }, "Caja archivada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, id, idEstado }, "Error al archivar caja");
			throw error;
		}
	}

	/**
	 * Desarchiva una caja (cambia su estado a activo)
	 * @param {number} id - ID de la caja
	 * @returns {Promise<Object>} Caja actualizada
	 */
	async desarchivarCaja(id) {
		try {
			// Validar que la caja exista
			const cajaExistente = await pool.query(
				"SELECT id_caja FROM public.cajas WHERE id_caja = $1",
				[id]
			);

			if (cajaExistente.rows.length === 0) {
				throw new Error("Caja no encontrada");
			}

			// Buscar el estado "Activo"
			const estadoActivo = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'activo' AND (modulo = 'Cajas' OR modulo = 'Global') LIMIT 1"
			);

			if (estadoActivo.rows.length === 0) {
				throw new Error("No se encontró el estado 'Activo' para cajas");
			}

			const idEstadoActivo = estadoActivo.rows[0].id_estado;

			const result = await pool.query(
				"UPDATE public.cajas SET id_estado = $1 WHERE id_caja = $2 RETURNING id_caja, nombre, descripcion, saldo_actual, id_estado",
				[idEstadoActivo, id]
			);

			logger.info({ cajaId: id, nuevoEstado: idEstadoActivo }, "Caja desarchivada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, id }, "Error al desarchivar caja");
			throw error;
		}
	}

	/**
	 * Obtiene los estados disponibles para cajas
	 * @returns {Promise<Array>} Lista de estados
	 */
	async obtenerEstados() {
		try {
			const result = await pool.query(
				`SELECT id_estado, nombre, color 
				 FROM public.estado 
				 WHERE modulo = 'Cajas' OR modulo = 'Global'
				 ORDER BY nombre`
			);
			logger.info({ count: result.rows.length }, "Estados obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener estados");
			throw error;
		}
	}
}

module.exports = new ConfiguracionCajasService();

