const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con cajas
 */
class CajasService {
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
	 * Obtiene una caja por ID
	 * @param {number} idCaja - ID de la caja
	 * @returns {Promise<Object>} Caja
	 */
	async obtenerCajaPorId(idCaja) {
		try {
			const query = `
				SELECT 
					c.*,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.cajas c
				LEFT JOIN public.estado e ON c.id_estado = e.id_estado
				WHERE c.id_caja = $1
			`;

			const result = await pool.query(query, [idCaja]);

			if (result.rows.length === 0) {
				throw new Error("Caja no encontrada");
			}

			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idCaja }, "Error al obtener caja por ID");
			throw error;
		}
	}

	/**
	 * Obtiene los movimientos de una caja
	 * @param {number} idCaja - ID de la caja
	 * @returns {Promise<Array>} Lista de movimientos
	 */
	async obtenerMovimientosCaja(idCaja) {
		try {
			const query = `
				SELECT 
					mc.*,
					tm.nombre as tipo_movimiento_nombre,
					u.nombre || ' ' || u.apellido as usuario_nombre,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.movimiento_caja mc
				LEFT JOIN public.tipo_movimiento tm ON mc.id_tipo_movimiento = tm.id_tipo_movimiento
				LEFT JOIN public.usuarios u ON mc.id_usuario = u.id_usuarios
				LEFT JOIN public.estado e ON mc.id_estado = e.id_estado
				WHERE mc.id_caja = $1
				ORDER BY mc.fecha_hora DESC
			`;

			const result = await pool.query(query, [idCaja]);
			logger.info({ count: result.rows.length, idCaja }, "Movimientos de caja obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error, idCaja }, "Error al obtener movimientos de caja");
			throw error;
		}
	}

	/**
	 * Obtiene el historial de movimientos de una caja con saldo acumulado
	 * @param {number} idCaja - ID de la caja
	 * @returns {Promise<Array>} Lista de movimientos con saldo acumulado
	 */
	async obtenerHistorialCaja(idCaja) {
		try {
			// Obtener el saldo actual de la caja
			const cajaQuery = await pool.query(
				"SELECT saldo_actual FROM public.cajas WHERE id_caja = $1",
				[idCaja]
			);

			if (cajaQuery.rows.length === 0) {
				throw new Error("Caja no encontrada");
			}

			const saldoActual = parseFloat(cajaQuery.rows[0].saldo_actual) || 0;

			// Obtener todos los movimientos ordenados por fecha (más antiguos primero para calcular saldo acumulado)
			// Como fecha_hora es "timestamp without time zone", ya está guardada en hora local de Colombia
			const movimientosQuery = `
				SELECT 
					mc.*,
					tm.nombre as tipo_movimiento_nombre,
					u.nombre || ' ' || u.apellido as usuario_nombre,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.movimiento_caja mc
				LEFT JOIN public.tipo_movimiento tm ON mc.id_tipo_movimiento = tm.id_tipo_movimiento
				LEFT JOIN public.usuarios u ON mc.id_usuario = u.id_usuarios
				LEFT JOIN public.estado e ON mc.id_estado = e.id_estado
				WHERE mc.id_caja = $1
				ORDER BY mc.fecha_hora ASC
			`;

			const movimientosResult = await pool.query(movimientosQuery, [idCaja]);
			const movimientos = movimientosResult.rows;

			// Calcular el saldo inicial: saldo actual - (suma de ingresos - suma de egresos)
			// O mejor: saldo inicial = saldo actual - suma de ingresos + suma de egresos
			let saldoInicial = saldoActual;
			for (const movimiento of movimientos) {
				const tipoNombre = (movimiento.tipo_movimiento_nombre || "").toLowerCase();
				const esIngreso = tipoNombre.includes("ingreso");
				const monto = parseFloat(movimiento.monto) || 0;
				if (esIngreso) {
					saldoInicial -= monto; // Restar ingresos para obtener el saldo inicial
				} else {
					saldoInicial += monto; // Sumar egresos para obtener el saldo inicial
				}
			}

			// Ahora calcular el saldo acumulado para cada movimiento (de más antiguo a más reciente)
			let saldoAcumulado = saldoInicial;
			const historial = movimientos.map((movimiento) => {
				const tipoNombre = (movimiento.tipo_movimiento_nombre || "").toLowerCase();
				const esIngreso = tipoNombre.includes("ingreso");
				const monto = parseFloat(movimiento.monto) || 0;
				
				// Calcular saldo después de este movimiento
				if (esIngreso) {
					saldoAcumulado += monto;
				} else {
					saldoAcumulado -= monto;
				}

				return {
					...movimiento,
					saldo_despues: parseFloat(saldoAcumulado.toFixed(2)),
					es_ingreso: esIngreso
				};
			});

			// Invertir el orden para mostrar los más recientes primero
			historial.reverse();

			logger.info({ count: historial.length, idCaja, saldoInicial, saldoActual }, "Historial de caja obtenido exitosamente");
			return historial;
		} catch (error) {
			logger.error({ err: error, idCaja }, "Error al obtener historial de caja");
			throw error;
		}
	}

	/**
	 * Obtiene todos los movimientos de todas las cajas
	 * @returns {Promise<Array>} Lista de movimientos
	 */
	async obtenerTodosLosMovimientos() {
		try {
			const query = `
				SELECT 
					mc.*,
					c.nombre as caja_nombre,
					tm.nombre as tipo_movimiento_nombre,
					u.nombre || ' ' || u.apellido as usuario_nombre,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.movimiento_caja mc
				LEFT JOIN public.cajas c ON mc.id_caja = c.id_caja
				LEFT JOIN public.tipo_movimiento tm ON mc.id_tipo_movimiento = tm.id_tipo_movimiento
				LEFT JOIN public.usuarios u ON mc.id_usuario = u.id_usuarios
				LEFT JOIN public.estado e ON mc.id_estado = e.id_estado
				ORDER BY mc.fecha_hora DESC
			`;

			const result = await pool.query(query);
			logger.info({ count: result.rows.length }, "Todos los movimientos obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener todos los movimientos");
			throw error;
		}
	}

	/**
	 * Obtiene los tipos de movimiento disponibles
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
	 * Obtiene el ID del estado "Activo" para movimientos
	 * @returns {Promise<number|null>} ID del estado activo
	 */
	async obtenerIdEstadoActivo() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'activo' AND (modulo = 'Cajas' OR modulo = 'Global') LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Activo' para cajas");
				return null;
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado activo");
			return null;
		}
	}

	/**
	 * Crea un movimiento de caja y actualiza el saldo
	 * @param {Object} datosMovimiento - Datos del movimiento
	 * @returns {Promise<Object>} Movimiento creado
	 */
	async crearMovimientoCaja(datosMovimiento) {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");

			// Validar que la caja exista
			const cajaExistente = await client.query(
				"SELECT id_caja, saldo_actual FROM public.cajas WHERE id_caja = $1",
				[datosMovimiento.id_caja]
			);

			if (cajaExistente.rows.length === 0) {
				throw new Error("Caja no encontrada");
			}

			const saldoActual = parseFloat(cajaExistente.rows[0].saldo_actual) || 0;

			// Obtener el tipo de movimiento para saber si es ingreso o egreso
			const tipoMovimiento = await client.query(
				"SELECT id_tipo_movimiento, nombre FROM public.tipo_movimiento WHERE id_tipo_movimiento = $1",
				[datosMovimiento.id_tipo_movimiento]
			);

			if (tipoMovimiento.rows.length === 0) {
				throw new Error("Tipo de movimiento no encontrado");
			}

			const esIngreso = tipoMovimiento.rows[0].nombre.toLowerCase().includes("ingreso");
			const monto = parseFloat(datosMovimiento.monto);

			if (monto <= 0) {
				throw new Error("El monto debe ser mayor a cero");
			}

			// Calcular nuevo saldo
			const nuevoSaldo = esIngreso ? saldoActual + monto : saldoActual - monto;

			// Validar que no quede saldo negativo
			if (nuevoSaldo < 0) {
				throw new Error("El saldo de la caja no puede quedar negativo");
			}

			// Obtener estado activo
			const idEstadoActivo = await this.obtenerIdEstadoActivo();
			if (!idEstadoActivo) {
				throw new Error("No se encontró el estado activo para movimientos");
			}

			// Crear el movimiento - usar función de PostgreSQL para obtener hora en zona horaria de Colombia
			// El servidor está en UTC, así que convertimos directamente a America/Bogota
			const movimientoQuery = `
				INSERT INTO public.movimiento_caja (
					id_caja,
					id_tipo_movimiento,
					monto,
					descripcion,
					fecha_hora,
					id_usuario,
					observaciones,
					id_estado
				) VALUES ($1, $2, $3, $4, (NOW() AT TIME ZONE 'America/Bogota')::timestamp without time zone, $5, $6, $7)
				RETURNING id_movimiento_caja, id_caja, id_tipo_movimiento, monto, descripcion, fecha_hora, id_usuario, observaciones, id_estado
			`;

			const movimientoResult = await client.query(movimientoQuery, [
				datosMovimiento.id_caja,
				datosMovimiento.id_tipo_movimiento,
				monto,
				datosMovimiento.descripcion || null,
				datosMovimiento.id_usuario,
				datosMovimiento.observaciones || null,
				idEstadoActivo
			]);

			// Actualizar el saldo de la caja
			await client.query(
				"UPDATE public.cajas SET saldo_actual = $1 WHERE id_caja = $2",
				[nuevoSaldo, datosMovimiento.id_caja]
			);

			await client.query("COMMIT");

			const movimiento = movimientoResult.rows[0];
			logger.info({ 
				movimientoId: movimiento.id_movimiento_caja, 
				cajaId: datosMovimiento.id_caja,
				monto,
				nuevoSaldo 
			}, "Movimiento de caja creado exitosamente");

			return {
				...movimiento,
				saldo_anterior: saldoActual,
				saldo_nuevo: nuevoSaldo
			};
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al crear movimiento de caja");
			throw error;
		} finally {
			client.release();
		}
	}
}

module.exports = new CajasService();

