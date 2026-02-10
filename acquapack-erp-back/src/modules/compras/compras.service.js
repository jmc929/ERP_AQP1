const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con compras/facturas
 */
class ComprasService {
	/**
	 * Obtiene el siguiente ID de factura disponible
	 * @returns {Promise<number>} Siguiente ID de factura
	 */
	async obtenerSiguienteIdFactura() {
		try {
			const result = await pool.query(
				"SELECT COALESCE(MAX(id_facturas), 0) + 1 as siguiente_id FROM public.facturas"
			);
			const siguienteId = parseInt(result.rows[0].siguiente_id, 10);
			logger.info({ siguienteId }, "Siguiente ID de factura obtenido");
			return siguienteId;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener siguiente ID de factura");
			throw error;
		}
	}

	/**
	 * Obtiene todos los proveedores activos
	 * @returns {Promise<Array>} Lista de proveedores
	 */
	async obtenerProveedores() {
		try {
			const result = await pool.query(`
				SELECT 
					p.id_proveedor,
					p.razon_social,
					p.nombre_comercial,
					p.identificacion,
					p.dv,
					p.id_estado
				FROM public.proveedor p
				WHERE p.id_estado IN (1, 2)
				ORDER BY p.razon_social
			`);
			logger.info({ count: result.rows.length }, "Proveedores obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener proveedores");
			throw error;
		}
	}

	/**
	 * Obtiene proveedores activos con paginación y búsqueda
	 * @param {number} page - Número de página
	 * @param {number} limit - Cantidad de registros por página
	 * @param {string} busqueda - Texto de búsqueda (razón social, nombre comercial o identificación)
	 * @returns {Promise<Object>} Proveedores paginados
	 */
	async obtenerProveedoresPaginados(page = 1, limit = 50, busqueda = "") {
		try {
			const offset = (page - 1) * limit;
			let query = `
				SELECT 
					p.id_proveedor,
					p.razon_social,
					p.nombre_comercial,
					p.identificacion,
					p.dv,
					p.id_estado
				FROM public.proveedor p
				WHERE p.id_estado IN (1, 2)
			`;
			const valores = [];
			let contador = 1;

			// Agregar filtro de búsqueda si existe
			if (busqueda && busqueda.trim() !== "") {
				query += ` AND (
					p.razon_social ILIKE $${contador} OR 
					p.nombre_comercial ILIKE $${contador} OR
					p.identificacion ILIKE $${contador}
				)`;
				valores.push(`%${busqueda.trim()}%`);
				contador++;
			}

			query += ` ORDER BY p.razon_social LIMIT $${contador} OFFSET $${contador + 1}`;
			valores.push(limit, offset);

			// Contar total de registros
			let countQuery = `
				SELECT COUNT(*) as total
				FROM public.proveedor p
				WHERE p.id_estado IN (1, 2)
			`;
			const countValores = [];
			let countContador = 1;

			if (busqueda && busqueda.trim() !== "") {
				countQuery += ` AND (
					p.razon_social ILIKE $${countContador} OR 
					p.nombre_comercial ILIKE $${countContador} OR
					p.identificacion ILIKE $${countContador}
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
			}, "Proveedores paginados obtenidos exitosamente");

			return {
				proveedores: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros: total,
					hayMas
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener proveedores paginados");
			throw error;
		}
	}

	/**
	 * Obtiene productos activos con paginación y búsqueda
	 * @param {number} page - Número de página
	 * @param {number} limit - Cantidad de registros por página
	 * @param {string} busqueda - Texto de búsqueda (código o nombre)
	 * @returns {Promise<Object>} Productos paginados
	 */
	async obtenerProductos(page = 1, limit = 50, busqueda = "") {
		try {
			const offset = (page - 1) * limit;
			let query = `
				SELECT 
					p.id_producto,
					p.codigo,
					p.nombre,
					p.id_estado
				FROM public.producto p
				WHERE p.id_estado IN (1, 2)
			`;
			const valores = [];
			let contador = 1;

			// Agregar filtro de búsqueda si existe
			if (busqueda && busqueda.trim() !== "") {
				query += ` AND (
					p.codigo ILIKE $${contador} OR 
					p.nombre ILIKE $${contador}
				)`;
				valores.push(`%${busqueda.trim()}%`);
				contador++;
			}

			query += ` ORDER BY p.codigo, p.nombre LIMIT $${contador} OFFSET $${contador + 1}`;
			valores.push(limit, offset);

			// Contar total de registros
			let countQuery = `
				SELECT COUNT(*) as total
				FROM public.producto p
				WHERE p.id_estado IN (1, 2)
			`;
			const countValores = [];
			let countContador = 1;

			if (busqueda && busqueda.trim() !== "") {
				countQuery += ` AND (
					p.codigo ILIKE $${countContador} OR 
					p.nombre ILIKE $${countContador}
				)`;
				countValores.push(`%${busqueda.trim()}%`);
			}

			const [result, countResult] = await Promise.all([
				pool.query(query, valores),
				pool.query(countQuery, countValores)
			]);

			const total = parseInt(countResult.rows[0].total, 10);
			const totalPaginas = Math.ceil(total / limit);

			logger.info({ 
				count: result.rows.length, 
				page, 
				limit, 
				total,
				busqueda: busqueda || "sin búsqueda"
			}, "Productos obtenidos exitosamente");

			return {
				productos: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros: total,
					limite: limit,
					hayMas: page < totalPaginas
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener productos");
			throw error;
		}
	}

	/**
	 * Obtiene todas las bodegas activas con conteo de productos
	 * @returns {Promise<Array>} Lista de bodegas con total_productos
	 */
	async obtenerBodegas() {
		try {
			const result = await pool.query(`
				SELECT 
					b.id_bodega,
					b.nombre,
					b.id_estado,
					COALESCE(COUNT(DISTINCT inv.id_producto), 0) as total_productos
				FROM public.bodegas b
				LEFT JOIN public.inventario inv ON b.id_bodega = inv.id_bodega
				WHERE b.id_estado IN (1, 2)
				GROUP BY b.id_bodega, b.nombre, b.id_estado
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
			logger.info({ count: result.rows.length }, "IVAs obtenidos exitosamente");
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
			logger.info({ count: result.rows.length }, "Retenciones obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener retenciones");
			throw error;
		}
	}

	/**
	 * Obtiene el ID del estado "Activo" para facturas
	 * @returns {Promise<number|null>} ID del estado activo
	 */
	async obtenerIdEstadoActivo() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'activo' AND (modulo = 'Compras' OR modulo = 'Global') LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Activo' para facturas");
				return 1; // Por defecto usar estado 1
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado activo");
			return 1; // Por defecto usar estado 1
		}
	}

	/**
	 * Crea una factura completa con todos sus detalles e inventario
	 * @param {Object} datosFactura - Datos de la factura
	 * @returns {Promise<Object>} Factura creada con detalles
	 */
	async crearFactura(datosFactura) {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");

			// Obtener estado activo
			const idEstado = await this.obtenerIdEstadoActivo();

			// 1. Insertar factura
			const facturaQuery = `
				INSERT INTO public.facturas (
					id_usuarios,
					fecha_creacion,
					id_proveedor,
					numero_factura_proveedor,
					total_subtotal,
					total_descuento,
					total_iva,
					total_retencion,
					total_factura,
					id_estado,
					observaciones
				) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
				RETURNING id_facturas
			`;

			const numeroFacturaProveedor = `${datosFactura.numeroFacturaLetras || ""}${datosFactura.numeroFacturaNumeros || ""}`.trim();

			const facturaResult = await client.query(facturaQuery, [
				datosFactura.id_usuarios,
				datosFactura.fecha_creacion,
				datosFactura.id_proveedor,
				numeroFacturaProveedor || null,
				datosFactura.total_subtotal || 0,
				datosFactura.total_descuento || 0,
				datosFactura.total_iva || 0,
				datosFactura.total_retencion || 0,
				datosFactura.total_factura || 0,
				idEstado,
				datosFactura.observaciones || null
			]);

			const idFactura = facturaResult.rows[0].id_facturas;

			// 2. Insertar detalles de factura y procesar inventario
			const detalles = datosFactura.detalles || [];
			const detallesInsertados = [];

			for (const detalle of detalles) {
				// Calcular porcentaje de descuento
				// detalle.descuento viene como monto calculado desde el frontend
				const subtotalSinDescuento = detalle.cantidad * detalle.precio_unitario;
				let porcentajeDescuento = 0;
				if (subtotalSinDescuento > 0 && detalle.descuento > 0) {
					// Calcular el porcentaje basado en el monto de descuento
					porcentajeDescuento = (detalle.descuento / subtotalSinDescuento) * 100;
				}

				// Calcular costo_unitario_con_impuesto: (subtotal + iva_valor) / cantidad
				// Este es el costo real que se pagó por unidad, incluyendo IVA
				const costoUnitarioConImpuesto = detalle.cantidad > 0 
					? (detalle.subtotal + (detalle.iva_valor || 0)) / detalle.cantidad 
					: 0;

				// Verificar qué columnas opcionales existen
				let tienePorcentajeDescuento = false;
				let tieneCostoUnitarioConImpuesto = false;

				try {
					const checkColumnsQuery = `
						SELECT column_name 
						FROM information_schema.columns 
						WHERE table_name = 'detalle_factura' 
						AND column_name IN ('porcentaje_descuento', 'costo_unitario_con_impuesto')
					`;
					const columnsCheck = await client.query(checkColumnsQuery);
					
					columnsCheck.rows.forEach(row => {
						if (row.column_name === 'porcentaje_descuento') {
							tienePorcentajeDescuento = true;
						}
						if (row.column_name === 'costo_unitario_con_impuesto') {
							tieneCostoUnitarioConImpuesto = true;
						}
					});
				} catch (checkError) {
					logger.warn({ err: checkError }, "No se pudieron verificar columnas opcionales");
				}

				// Construir la consulta dinámicamente según las columnas disponibles
				let campos = [
					'id_factura',
					'id_producto',
					'cantidad',
					'precio_unitario',
					'descuento',
					'subtotal',
					'id_iva',
					'iva_valor',
					'id_retefuente',
					'retefuente_valor',
					'valor_total'
				];

				let valores = [
					idFactura,
					detalle.id_producto,
					detalle.cantidad,
					detalle.precio_unitario,
					detalle.descuento,
					detalle.subtotal,
					detalle.id_iva || null,
					detalle.iva_valor || 0,
					detalle.id_retefuente || null,
					detalle.retefuente_valor || 0,
					detalle.valor_total
				];

				if (tienePorcentajeDescuento) {
					campos.push('porcentaje_descuento');
					valores.push(porcentajeDescuento);
				}

				if (tieneCostoUnitarioConImpuesto) {
					campos.push('costo_unitario_con_impuesto');
					valores.push(costoUnitarioConImpuesto);
				}

				// Construir la consulta INSERT dinámicamente
				const placeholders = valores.map((_, index) => `$${index + 1}`).join(', ');
				const detalleQuery = `
					INSERT INTO public.detalle_factura (
						${campos.join(', ')}
					) VALUES (${placeholders})
					RETURNING id_detalle_factura
				`;

				const detalleResult = await client.query(detalleQuery, valores);

				// 3. Insertar en inventario
				const inventarioQuery = `
					INSERT INTO public.inventario (
						id_bodega,
						id_producto,
						id_proveedor,
						fecha_ingreso,
						id_factura,
						cantidad_lote,
						costo_producto
					) VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id_inventario
				`;

				await client.query(inventarioQuery, [
					detalle.id_bodega,
					detalle.id_producto,
					datosFactura.id_proveedor,
					datosFactura.fecha_creacion,
					idFactura,
					detalle.cantidad,
					detalle.valor_total
				]);

				// 4. Insertar en movimientos_kardex
				// IMPORTANTE: Usar costo_unitario_con_impuesto (precio + IVA) para consistencia con traslados
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

				// Usar el costo_unitario_con_impuesto calculado (precio + IVA)
				// Esto asegura consistencia con los movimientos de traslado
				await client.query(kardexQuery, [
					detalle.id_bodega,
					detalle.id_producto,
					"Entrada por Factura",
					"Entrada",
					detalle.cantidad,
					costoUnitarioConImpuesto, // Usar el valor calculado con IVA
					costoUnitarioConImpuesto * detalle.cantidad
				]);

				// 5. Actualizar cantidad_total en producto
				const updateProductoQuery = `
					UPDATE public.producto
					SET cantidad_total = COALESCE(cantidad_total, 0) + $1
					WHERE id_producto = $2
					RETURNING id_producto, cantidad_total
				`;

				await client.query(updateProductoQuery, [
					detalle.cantidad,
					detalle.id_producto
				]);

				// 6. UPSERT en producto_x_proveedor
				const upsertProductoProveedorQuery = `
					INSERT INTO public.producto_x_proveedor (
						id_producto,
						id_proveedor,
						costo
					) VALUES ($1, $2, $3)
					ON CONFLICT (id_producto, id_proveedor) 
					DO UPDATE SET costo = $3
					RETURNING id_producto_x_proveedor
				`;

				// Verificar si existe la constraint unique, si no, usar otro método
				const checkConstraintQuery = `
					SELECT constraint_name 
					FROM information_schema.table_constraints 
					WHERE table_name = 'producto_x_proveedor' 
					AND constraint_type = 'UNIQUE'
				`;
				const constraintResult = await client.query(checkConstraintQuery);

				if (constraintResult.rows.length > 0) {
					// Hay constraint unique, usar ON CONFLICT
					await client.query(upsertProductoProveedorQuery, [
						detalle.id_producto,
						datosFactura.id_proveedor,
						detalle.precio_unitario
					]);
				} else {
					// No hay constraint, hacer verificación manual
					const checkQuery = `
						SELECT id_producto_x_proveedor 
						FROM public.producto_x_proveedor 
						WHERE id_producto = $1 AND id_proveedor = $2
					`;
					const checkResult = await client.query(checkQuery, [
						detalle.id_producto,
						datosFactura.id_proveedor
					]);

					if (checkResult.rows.length > 0) {
						// Actualizar
						const updateQuery = `
							UPDATE public.producto_x_proveedor
							SET costo = $1
							WHERE id_producto = $2 AND id_proveedor = $3
						`;
						await client.query(updateQuery, [
							detalle.precio_unitario,
							detalle.id_producto,
							datosFactura.id_proveedor
						]);
					} else {
						// Insertar
						const insertQuery = `
							INSERT INTO public.producto_x_proveedor (
								id_producto,
								id_proveedor,
								costo
							) VALUES ($1, $2, $3)
						`;
						await client.query(insertQuery, [
							detalle.id_producto,
							datosFactura.id_proveedor,
							detalle.precio_unitario
						]);
					}
				}

				detallesInsertados.push(detalleResult.rows[0]);
			}

			await client.query("COMMIT");

			logger.info({ facturaId: idFactura, detallesCount: detallesInsertados.length }, "Factura creada exitosamente");

			// Obtener la factura completa
			const facturaCompleta = await pool.query(
				`SELECT * FROM public.facturas WHERE id_facturas = $1`,
				[idFactura]
			);

			return {
				factura: facturaCompleta.rows[0],
				detalles: detallesInsertados
			};
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al crear factura");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene todas las facturas con información del proveedor y usuario
	 * @returns {Promise<Array>} Lista de facturas
	 */
	async obtenerFacturas() {
		try {
			const result = await pool.query(`
				SELECT 
					f.id_facturas,
					f.fecha_creacion,
					f.numero_factura_proveedor,
					f.total_subtotal,
					f.total_descuento,
					f.total_iva,
					f.total_retencion,
					f.total_factura,
					f.id_estado,
					f.observaciones,
					p.id_proveedor,
					p.razon_social,
					p.nombre_comercial,
					u.id_usuarios,
					u.nombre as usuario_nombre,
					u.apellido as usuario_apellido,
					e.nombre as estado_nombre
				FROM public.facturas f
				LEFT JOIN public.proveedor p ON f.id_proveedor = p.id_proveedor
				LEFT JOIN public.usuarios u ON f.id_usuarios = u.id_usuarios
				LEFT JOIN public.estado e ON f.id_estado = e.id_estado
				ORDER BY f.id_facturas DESC
			`);
			logger.info({ count: result.rows.length }, "Facturas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener facturas");
			throw error;
		}
	}

	/**
	 * Obtiene los detalles completos de una factura específica
	 * @param {number} idFactura - ID de la factura
	 * @returns {Promise<Object>} Factura con todos sus detalles
	 */
	async obtenerDetalleFactura(idFactura) {
		try {
			// Obtener información de la factura
			const facturaResult = await pool.query(`
				SELECT 
					f.id_facturas,
					f.fecha_creacion,
					f.numero_factura_proveedor,
					f.total_subtotal,
					f.total_descuento,
					f.total_iva,
					f.total_retencion,
					f.total_factura,
					f.id_estado,
					f.observaciones,
					p.id_proveedor,
					p.razon_social,
					p.nombre_comercial,
					p.identificacion as proveedor_identificacion,
					u.id_usuarios,
					u.nombre as usuario_nombre,
					u.apellido as usuario_apellido,
					e.nombre as estado_nombre
				FROM public.facturas f
				LEFT JOIN public.proveedor p ON f.id_proveedor = p.id_proveedor
				LEFT JOIN public.usuarios u ON f.id_usuarios = u.id_usuarios
				LEFT JOIN public.estado e ON f.id_estado = e.id_estado
				WHERE f.id_facturas = $1
			`, [idFactura]);

			if (facturaResult.rows.length === 0) {
				throw new Error(`Factura con ID ${idFactura} no encontrada`);
			}

			const factura = facturaResult.rows[0];

			// Obtener detalles de la factura (productos) con bodegas desde inventario
			const detallesResult = await pool.query(`
				SELECT DISTINCT ON (df.id_detalle_factura)
					df.id_detalle_factura,
					df.cantidad,
					df.precio_unitario,
					df.descuento,
					COALESCE(df.porcentaje_descuento, 0) as porcentaje_descuento,
					df.subtotal,
					df.iva_valor,
					df.retefuente_valor,
					df.valor_total,
					pr.id_producto,
					pr.codigo as producto_codigo,
					pr.nombre as producto_nombre,
					b.id_bodega,
					b.nombre as bodega_nombre,
					i.id_iva,
					i.nombre as iva_nombre,
					i.valor as iva_porcentaje,
					r.id_retefuente,
					r.nombre as retencion_nombre,
					r.valor as retencion_porcentaje
				FROM public.detalle_factura df
				LEFT JOIN public.producto pr ON df.id_producto = pr.id_producto
				LEFT JOIN public.inventario inv ON inv.id_factura = df.id_factura AND inv.id_producto = df.id_producto
				LEFT JOIN public.bodegas b ON inv.id_bodega = b.id_bodega
				LEFT JOIN public.ivas i ON df.id_iva = i.id_iva
				LEFT JOIN public.retefuente r ON df.id_retefuente = r.id_retefuente
				WHERE df.id_factura = $1
				ORDER BY df.id_detalle_factura, inv.id_inventario
			`, [idFactura]);

			const detallesConBodegas = detallesResult.rows.map((detalle) => ({
				...detalle,
				bodega_nombre: detalle.bodega_nombre || "N/A",
				id_bodega: detalle.id_bodega || null
			}));

			logger.info({ facturaId: idFactura, detallesCount: detallesConBodegas.length }, "Detalle de factura obtenido exitosamente");

			return {
				factura,
				detalles: detallesConBodegas
			};
		} catch (error) {
			logger.error({ err: error, facturaId: idFactura }, "Error al obtener detalle de factura");
			throw error;
		}
	}

	/**
	 * Obtiene todos los productos_x_proveedor con información de productos y proveedores
	 * @param {number} idProveedor - ID del proveedor para filtrar (opcional)
	 * @returns {Promise<Array>} Lista de productos_x_proveedor
	 */
	async obtenerProductosXProveedor(idProveedor = null) {
		try {
			let query = `
				SELECT 
					pxp.id_producto_x_proveedor,
					pxp.id_producto,
					pxp.id_proveedor,
					pxp.costo,
					p.codigo as producto_codigo,
					p.nombre as producto_nombre,
					prov.razon_social,
					prov.nombre_comercial
				FROM public.producto_x_proveedor pxp
				LEFT JOIN public.producto p ON pxp.id_producto = p.id_producto
				LEFT JOIN public.proveedor prov ON pxp.id_proveedor = prov.id_proveedor
			`;

			const valores = [];

			if (idProveedor) {
				query += ` WHERE pxp.id_proveedor = $1`;
				valores.push(idProveedor);
			}

			query += ` ORDER BY prov.razon_social, p.nombre`;

			const result = await pool.query(query, valores);
			logger.info({ count: result.rows.length, idProveedor }, "Productos x Proveedor obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener productos_x_proveedor");
			throw error;
		}
	}
}

module.exports = new ComprasService();

