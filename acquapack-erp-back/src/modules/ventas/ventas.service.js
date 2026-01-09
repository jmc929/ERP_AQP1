const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con ventas/salidas
 */
class VentasService {
	/**
	 * Obtiene el siguiente ID de salida disponible
	 * @returns {Promise<number>} Siguiente ID de salida
	 */
	async obtenerSiguienteIdSalida() {
		try {
			const result = await pool.query(
				"SELECT COALESCE(MAX(id_salida), 0) + 1 as siguiente_id FROM public.salidas"
			);
			const siguienteId = parseInt(result.rows[0].siguiente_id, 10);
			logger.info({ siguienteId }, "Siguiente ID de salida obtenido");
			return siguienteId;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener siguiente ID de salida");
			throw error;
		}
	}

	/**
	 * Obtiene todos los clientes activos
	 * @returns {Promise<Array>} Lista de clientes
	 */
	async obtenerClientes() {
		try {
			const result = await pool.query(`
				SELECT 
					c.id_cliente,
					c.razon_social,
					c.nombre_comercial,
					c.identificacion,
					c.dv,
					c.id_estado
				FROM public.clientes c
				WHERE c.id_estado IN (1, 2)
				ORDER BY c.razon_social
			`);
			logger.info({ count: result.rows.length }, "Clientes obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener clientes");
			throw error;
		}
	}

	/**
	 * Obtiene clientes activos con paginación y búsqueda
	 * @param {number} page - Número de página
	 * @param {number} limit - Cantidad de registros por página
	 * @param {string} busqueda - Texto de búsqueda (razón social, nombre comercial o identificación)
	 * @returns {Promise<Object>} Clientess paginados
	 */
	async obtenerClientesPaginados(page = 1, limit = 50, busqueda = "") {
		try {
			const offset = (page - 1) * limit;
			let query = `
				SELECT 
					c.id_cliente,
					c.razon_social,
					c.nombre_comercial,
					c.identificacion,
					c.dv,
					c.id_estado
				FROM public.clientes c
				WHERE c.id_estado IN (1, 2)
			`;
			const valores = [];
			let contador = 1;

			// Agregar filtro de búsqueda si existe
			if (busqueda && busqueda.trim() !== "") {
				query += ` AND (
					c.razon_social ILIKE $${contador} OR 
					c.nombre_comercial ILIKE $${contador} OR
					c.identificacion ILIKE $${contador}
				)`;
				valores.push(`%${busqueda.trim()}%`);
				contador++;
			}

			query += ` ORDER BY c.razon_social LIMIT $${contador} OFFSET $${contador + 1}`;
			valores.push(limit, offset);

			// Contar total de registros
			let countQuery = `
				SELECT COUNT(*) as total
				FROM public.clientes c
				WHERE c.id_estado IN (1, 2)
			`;
			const countValores = [];
			let countContador = 1;

			if (busqueda && busqueda.trim() !== "") {
				countQuery += ` AND (
					c.razon_social ILIKE $${countContador} OR 
					c.nombre_comercial ILIKE $${countContador} OR
					c.identificacion ILIKE $${countContador}
				)`;
				countValores.push(`%${busqueda.trim()}%`);
			}

			const [result, countResult] = await Promise.all([
				pool.query(query, valores),
				pool.query(countQuery, countValores)
			]);

			const total = parseInt(countResult.rows[0].total, 10);
			const totalPaginas = Math.ceil(total / limit);
			const hayMas = page < totalPaginas;

			logger.info({ 
				page, 
				limit, 
				busqueda, 
				total, 
				totalPaginas, 
				count: result.rows.length 
			}, "Clientes paginados obtenidos exitosamente");

			return {
				clientes: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros: total,
					hayMas
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener clientes paginados");
			throw error;
		}
	}

	/**
	 * Obtiene productos con stock disponible en una bodega específica
	 * @param {number} idBodega - ID de la bodega
	 * @param {number} page - Número de página
	 * @param {number} limit - Cantidad de registros por página
	 * @param {string} busqueda - Texto de búsqueda (código o nombre)
	 * @returns {Promise<Object>} Productos paginados con stock
	 */
	async obtenerProductos(idBodega, page = 1, limit = 50, busqueda = "") {
		try {
			const offset = (page - 1) * limit;
			let query = `
				SELECT DISTINCT
					p.id_producto,
					p.codigo,
					p.nombre,
					p.id_estado,
					COALESCE(SUM(i.cantidad_lote), 0) as stock_disponible
				FROM public.producto p
				LEFT JOIN public.inventario i ON p.id_producto = i.id_producto AND i.id_bodega = $1
				WHERE p.id_estado IN (1, 2)
			`;
			const valores = [idBodega];
			let contador = 2;

			// Agregar filtro de búsqueda si existe
			if (busqueda && busqueda.trim() !== "") {
				query += ` AND (
					p.codigo ILIKE $${contador} OR 
					p.nombre ILIKE $${contador}
				)`;
				valores.push(`%${busqueda.trim()}%`);
				contador++;
			}

			query += ` GROUP BY p.id_producto, p.codigo, p.nombre, p.id_estado
				HAVING COALESCE(SUM(i.cantidad_lote), 0) > 0
				ORDER BY p.codigo, p.nombre 
				LIMIT $${contador} OFFSET $${contador + 1}`;
			valores.push(limit, offset);

			// Contar total de registros
			let countQuery = `
				SELECT COUNT(DISTINCT p.id_producto) as total
				FROM public.producto p
				LEFT JOIN public.inventario i ON p.id_producto = i.id_producto AND i.id_bodega = $1
				WHERE p.id_estado IN (1, 2)
			`;
			const countValores = [idBodega];
			let countContador = 2;

			if (busqueda && busqueda.trim() !== "") {
				countQuery += ` AND (
					p.codigo ILIKE $${countContador} OR 
					p.nombre ILIKE $${countContador}
				)`;
				countValores.push(`%${busqueda.trim()}%`);
			}

			countQuery += ` HAVING COALESCE(SUM(i.cantidad_lote), 0) > 0`;

			const [productosResult, countResult] = await Promise.all([
				pool.query(query, valores),
				pool.query(countQuery, countValores)
			]);

			const total = parseInt(countResult.rows[0]?.total || 0, 10);
			const totalPages = Math.ceil(total / limit);

			logger.info({ 
				bodegaId: idBodega,
				page, 
				limit, 
				total, 
				totalPages,
				count: productosResult.rows.length 
			}, "Productos con stock obtenidos exitosamente");

			return {
				productos: productosResult.rows,
				paginacion: {
					page,
					limit,
					total,
					totalPages
				}
			};
		} catch (error) {
			logger.error({ err: error, idBodega, page, limit, busqueda }, "Error al obtener productos con stock");
			throw error;
		}
	}

	/**
	 * Obtiene todas las bodegas activas
	 * @returns {Promise<Array>} Lista de bodegas
	 */
	async obtenerBodegas() {
		try {
			const result = await pool.query(`
				SELECT 
					b.id_bodega,
					b.nombre,
					b.id_estado
				FROM public.bodegas b
				WHERE b.id_estado IN (1, 2)
				ORDER BY b.nombre
			`);
			logger.info({ count: result.rows.length }, "Bodegas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener bodegas");
			throw error;
		}
	}

	/**
	 * Obtiene todos los IVAs disponibles
	 * @returns {Promise<Array>} Lista de IVAs
	 */
	async obtenerIvas() {
		try {
			const result = await pool.query(`
				SELECT
					i.id_iva,
					i.nombre,
					i.valor
				FROM public.ivas i
				ORDER BY i.valor
			`);
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener IVAs");
			throw error;
		}
	}

	/**
	 * Obtiene todas las retenciones disponibles
	 * @returns {Promise<Array>} Lista de retenciones
	 */
	async obtenerRetenciones() {
		try {
			const result = await pool.query(`
				SELECT
					r.id_retefuente,
					r.nombre,
					r.valor
				FROM public.retefuente r
				ORDER BY r.valor
			`);
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener retenciones");
			throw error;
		}
	}

	/**
	 * Crea una salida (venta) completa con todos sus detalles e inventario (FIFO)
	 * @param {Object} datosSalida - Datos de la salida
	 * @returns {Promise<Object>} Salida creada con detalles
	 */
	async crearSalida(datosSalida) {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");

			// 1. Insertar salida
			const salidaQuery = `
				INSERT INTO public.salidas (
					id_usuario,
					fecha_creacion,
					id_cliente,
					total_subtotal,
					total_descuento,
					total_iva,
					total_retencion,
					total_factura
				) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				RETURNING id_salida
			`;

			const salidaResult = await client.query(salidaQuery, [
				datosSalida.id_usuario,
				datosSalida.fecha_creacion,
				datosSalida.id_cliente,
				datosSalida.total_subtotal || 0,
				datosSalida.total_descuento || 0,
				datosSalida.total_iva || 0,
				datosSalida.total_retencion || 0,
				datosSalida.total_factura || 0
			]);

			const idSalida = salidaResult.rows[0].id_salida;

			// 2. Insertar detalles de salida y procesar inventario (FIFO)
			const detalles = datosSalida.detalles || [];
			const detallesInsertados = [];

			for (const detalle of detalles) {
				// Insertar detalle de salida
				const detalleQuery = `
					INSERT INTO public.detalle_salida (
						id_salida,
						id_producto,
						cantidad,
						precio_unitario,
						descuento,
						subtotal,
						id_iva,
						iva_valor,
						id_retefuente,
						retefuente_valor,
						valor_total
					) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
					RETURNING id_detalle_salida
				`;

				const detalleResult = await client.query(detalleQuery, [
					idSalida,
					detalle.id_producto,
					detalle.cantidad,
					detalle.precio_unitario,
					detalle.descuento || 0,
					detalle.subtotal,
					detalle.id_iva || null,
					detalle.iva_valor || 0,
					detalle.id_retefuente || null,
					detalle.retefuente_valor || 0,
					detalle.valor_total
				]);

				// 3. Procesar inventario con lógica FIFO
				let cantidadRestante = detalle.cantidad;
				const idBodega = detalle.id_bodega;

				// Obtener lotes ordenados por fecha_ingreso (FIFO: más antiguos primero)
				const lotesQuery = `
					SELECT 
						id_inventario,
						cantidad_lote,
						costo_producto,
						fecha_ingreso,
						id_factura
					FROM public.inventario
					WHERE id_bodega = $1 
						AND id_producto = $2
						AND cantidad_lote > 0
					ORDER BY fecha_ingreso ASC, id_inventario ASC
				`;

				const lotesResult = await client.query(lotesQuery, [idBodega, detalle.id_producto]);

				if (lotesResult.rows.length === 0) {
					throw new Error(`No hay stock disponible para el producto ID ${detalle.id_producto} en la bodega ${idBodega}`);
				}

				// Calcular stock total disponible
				const stockTotal = lotesResult.rows.reduce((sum, lote) => sum + parseFloat(lote.cantidad_lote), 0);
				if (stockTotal < cantidadRestante) {
					throw new Error(`Stock insuficiente. Disponible: ${stockTotal}, Solicitado: ${cantidadRestante}`);
				}

				// Procesar cada lote hasta cubrir la cantidad solicitada
				for (const lote of lotesResult.rows) {
					if (cantidadRestante <= 0) break;

					const cantidadLote = parseFloat(lote.cantidad_lote);
					const costoUnitario = parseFloat(lote.costo_producto) / cantidadLote;
					const cantidadAUsar = Math.min(cantidadLote, cantidadRestante);
					const costoTotalUsado = costoUnitario * cantidadAUsar;

					// Actualizar o eliminar el lote
					if (cantidadAUsar >= cantidadLote) {
						// Eliminar el lote completo
						await client.query(
							"DELETE FROM public.inventario WHERE id_inventario = $1",
							[lote.id_inventario]
						);
					} else {
						// Actualizar la cantidad restante del lote
						const nuevaCantidad = cantidadLote - cantidadAUsar;
						const nuevoCosto = parseFloat(lote.costo_producto) - costoTotalUsado;
						await client.query(
							`UPDATE public.inventario 
							 SET cantidad_lote = $1,
							     costo_producto = $2
							 WHERE id_inventario = $3`,
							[nuevaCantidad, nuevoCosto, lote.id_inventario]
						);
					}

					// Crear movimiento de kardex (salida)
					const kardexQuery = `
						INSERT INTO public.movimientos_kardex (
							id_bodega,
							id_producto,
							tipo_movimiento,
							tipo_flujo,
							cantidad,
							costo_unitario,
							costo_total_movimiento,
							"fecha "
						) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
						RETURNING id_movimientos
					`;

					await client.query(kardexQuery, [
						idBodega,
						detalle.id_producto,
						"Venta",
						"Salida",
						cantidadAUsar,
						costoUnitario,
						costoTotalUsado
					]);

					cantidadRestante -= cantidadAUsar;
				}

				// 4. Actualizar cantidad_total en producto (restar)
				const updateProductoQuery = `
					UPDATE public.producto
					SET cantidad_total = GREATEST(COALESCE(cantidad_total, 0) - $1, 0)
					WHERE id_producto = $2
					RETURNING id_producto, cantidad_total
				`;

				await client.query(updateProductoQuery, [
					detalle.cantidad,
					detalle.id_producto
				]);

				detallesInsertados.push(detalleResult.rows[0]);
			}

			await client.query("COMMIT");

			logger.info({ salidaId: idSalida, detallesCount: detallesInsertados.length }, "Salida creada exitosamente");

			// Obtener la salida completa
			const salidaCompleta = await pool.query(
				`SELECT * FROM public.salidas WHERE id_salida = $1`,
				[idSalida]
			);

			return {
				salida: salidaCompleta.rows[0],
				detalles: detallesInsertados
			};
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al crear salida");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene todas las salidas con información del cliente y usuario
	 * @returns {Promise<Array>} Lista de salidas
	 */
	async obtenerSalidas() {
		try {
			const result = await pool.query(`
				SELECT 
					s.id_salida,
					s.fecha_creacion,
					s.total_subtotal,
					s.total_descuento,
					s.total_iva,
					s.total_retencion,
					s.total_factura,
					c.id_cliente,
					c.razon_social,
					c.nombre_comercial,
					u.id_usuarios as id_usuario,
					u.nombre as usuario_nombre,
					u.apellido as usuario_apellido
				FROM public.salidas s
				LEFT JOIN public.clientes c ON s.id_cliente = c.id_cliente
				LEFT JOIN public.usuarios u ON s.id_usuario = u.id_usuarios
				ORDER BY s.id_salida DESC
			`);
			logger.info({ count: result.rows.length }, "Salidas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener salidas");
			throw error;
		}
	}

	/**
	 * Obtiene los detalles completos de una salida específica
	 * @param {number} idSalida - ID de la salida
	 * @returns {Promise<Object>} Salida con todos sus detalles
	 */
	async obtenerDetalleSalida(idSalida) {
		try {
			// Obtener información de la salida
			const salidaResult = await pool.query(`
				SELECT 
					s.id_salida,
					s.fecha_creacion,
					s.total_subtotal,
					s.total_descuento,
					s.total_iva,
					s.total_retencion,
					s.total_factura,
					c.id_cliente,
					c.razon_social,
					c.nombre_comercial,
					c.identificacion as cliente_identificacion,
					u.id_usuarios as id_usuario,
					u.nombre as usuario_nombre,
					u.apellido as usuario_apellido
				FROM public.salidas s
				LEFT JOIN public.clientes c ON s.id_cliente = c.id_cliente
				LEFT JOIN public.usuarios u ON s.id_usuario = u.id_usuarios
				WHERE s.id_salida = $1
			`, [idSalida]);

			if (salidaResult.rows.length === 0) {
				throw new Error(`Salida con ID ${idSalida} no encontrada`);
			}

			const salida = salidaResult.rows[0];

			// Obtener detalles de la salida (productos)
			const detallesResult = await pool.query(`
				SELECT 
					ds.id_detalle_salida,
					ds.cantidad,
					ds.precio_unitario,
					ds.descuento,
					ds.subtotal,
					ds.iva_valor,
					ds.retefuente_valor,
					ds.valor_total,
					p.id_producto,
					p.codigo as producto_codigo,
					p.nombre as producto_nombre,
					i.id_iva,
					i.nombre as iva_nombre,
					i.valor as iva_porcentaje,
					r.id_retefuente,
					r.nombre as retencion_nombre,
					r.valor as retencion_porcentaje
				FROM public.detalle_salida ds
				LEFT JOIN public.producto p ON ds.id_producto = p.id_producto
				LEFT JOIN public.ivas i ON ds.id_iva = i.id_iva
				LEFT JOIN public.retefuente r ON ds.id_retefuente = r.id_retefuente
				WHERE ds.id_salida = $1
				ORDER BY ds.id_detalle_salida
			`, [idSalida]);

			logger.info({ salidaId: idSalida, detallesCount: detallesResult.rows.length }, "Detalle de salida obtenido exitosamente");

			return {
				salida,
				detalles: detallesResult.rows
			};
		} catch (error) {
			logger.error({ err: error, salidaId: idSalida }, "Error al obtener detalle de salida");
			throw error;
		}
	}
}

module.exports = new VentasService();

