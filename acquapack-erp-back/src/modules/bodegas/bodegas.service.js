const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con bodegas
 */
class BodegasService {
	/**
	 * Obtiene el ID del estado "Activo" desde la base de datos
	 * @returns {Promise<number|null>} ID del estado activo
	 */
	async obtenerIdEstadoActivo() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'activo' AND (modulo = 'Inventario' OR modulo = 'Global') LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Activo' para inventario");
				return null;
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado activo");
			return null;
		}
	}

	/**
	 * Obtiene el ID del estado "Eliminado" desde la base de datos
	 * @returns {Promise<number|null>} ID del estado eliminado
	 */
	async obtenerIdEstadoEliminado() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'eliminado' AND (modulo = 'Inventario' OR modulo = 'Global') LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Eliminado' para inventario");
				return null;
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado eliminado");
			return null;
		}
	}

	/**
	 * Obtiene todas las bodegas
	 * @returns {Promise<Array>} Lista de bodegas
	 */
	async obtenerBodegas() {
		try {
			const query = `
				SELECT 
					b.*,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.bodegas b
				LEFT JOIN public.estado e ON b.id_estado = e.id_estado
				ORDER BY b.id_bodega DESC
			`;

			const result = await pool.query(query);
			logger.info({ count: result.rows.length }, "Bodegas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener bodegas");
			throw error;
		}
	}

	/**
	 * Obtiene una bodega por ID
	 * @param {number} idBodega - ID de la bodega
	 * @returns {Promise<Object>} Bodega
	 */
	async obtenerBodegaPorId(idBodega) {
		try {
			const query = `
				SELECT 
					b.*,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.bodegas b
				LEFT JOIN public.estado e ON b.id_estado = e.id_estado
				WHERE b.id_bodega = $1
			`;

			const result = await pool.query(query, [idBodega]);

			if (result.rows.length === 0) {
				throw new Error("Bodega no encontrada");
			}

			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idBodega }, "Error al obtener bodega por ID");
			throw error;
		}
	}

	/**
	 * Obtiene los catálogos necesarios para el formulario
	 * @returns {Promise<Object>} Catálogos
	 */
	async obtenerCatalogos() {
		try {
			const [estados] = await Promise.all([
				pool.query("SELECT id_estado, nombre, color FROM public.estado WHERE id_estado IN (1, 2, 3) ORDER BY id_estado")
			]);

			return {
				estados: estados.rows
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener catálogos de bodegas");
			throw error;
		}
	}

	/**
	 * Crea una nueva bodega
	 * @param {Object} datosBodega - Datos de la bodega
	 * @returns {Promise<Object>} Bodega creada
	 */
	async crearBodega(datosBodega) {
		try {
			// Validar que el nombre no exista
			if (datosBodega.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_bodega FROM public.bodegas WHERE nombre = $1",
					[datosBodega.nombre]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe una bodega con este nombre");
				}
			}

			// Si no se proporcionó id_estado, usar el estado con id 1 (Activo)
			let idEstado = datosBodega.id_estado;
			if (!idEstado) {
				idEstado = 1; // Estado por defecto
			}

			// Validar que el estado esté en la lista permitida (1, 2, 3)
			if (![1, 2, 3].includes(idEstado)) {
				throw new Error("Estado no permitido. Solo se permiten estados con ID 1, 2 o 3");
			}

			const query = `
				INSERT INTO public.bodegas (nombre, id_estado)
				VALUES ($1, $2)
				RETURNING id_bodega, nombre, id_estado
			`;

			const valores = [
				datosBodega.nombre || null,
				idEstado
			];

			const result = await pool.query(query, valores);
			logger.info({ bodegaId: result.rows[0].id_bodega }, "Bodega creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear bodega");
			throw error;
		}
	}

	/**
	 * Actualiza una bodega
	 * @param {number} idBodega - ID de la bodega
	 * @param {Object} datosBodega - Datos actualizados
	 * @returns {Promise<Object>} Bodega actualizada
	 */
	async actualizarBodega(idBodega, datosBodega) {
		try {
			// Validar que la bodega exista
			const bodegaExistente = await pool.query(
				"SELECT id_bodega FROM public.bodegas WHERE id_bodega = $1",
				[idBodega]
			);

			if (bodegaExistente.rows.length === 0) {
				throw new Error("Bodega no encontrada");
			}

			// Validar que el nombre no esté en uso por otra bodega
			if (datosBodega.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_bodega FROM public.bodegas WHERE nombre = $1 AND id_bodega != $2",
					[datosBodega.nombre, idBodega]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra bodega con este nombre");
				}
			}

			// Construir la query de actualización dinámicamente
			const campos = [];
			const valores = [];
			let contador = 1;

			// Validar que el estado esté en la lista permitida si se proporciona
			if (datosBodega.id_estado !== undefined && datosBodega.id_estado !== null) {
				if (![1, 2, 3].includes(datosBodega.id_estado)) {
					throw new Error("Estado no permitido. Solo se permiten estados con ID 1, 2 o 3");
				}
			}

			const camposPermitidos = {
				nombre: datosBodega.nombre,
				id_estado: datosBodega.id_estado
			};

			for (const [campo, valor] of Object.entries(camposPermitidos)) {
				if (valor !== undefined) {
					campos.push(`${campo} = $${contador}`);
					valores.push(valor === null || valor === "" ? null : valor);
					contador++;
				}
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idBodega);
			const query = `
				UPDATE public.bodegas 
				SET ${campos.join(", ")}
				WHERE id_bodega = $${contador}
				RETURNING id_bodega, nombre, id_estado
			`;

			const result = await pool.query(query, valores);
			logger.info({ bodegaId: idBodega }, "Bodega actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idBodega }, "Error al actualizar bodega");
			throw error;
		}
	}

	/**
	 * Cambia el estado de una bodega
	 * @param {number} idBodega - ID de la bodega
	 * @param {number} idEstado - ID del nuevo estado
	 * @returns {Promise<Object>} Bodega actualizada
	 */
	async cambiarEstadoBodega(idBodega, idEstado) {
		try {
			// Validar que la bodega exista
			const bodegaExistente = await pool.query(
				"SELECT id_bodega FROM public.bodegas WHERE id_bodega = $1",
				[idBodega]
			);

			if (bodegaExistente.rows.length === 0) {
				throw new Error("Bodega no encontrada");
			}

			// Validar que el estado esté en la lista permitida (1, 2, 3)
			if (![1, 2, 3].includes(idEstado)) {
				throw new Error("Estado no permitido. Solo se permiten estados con ID 1, 2 o 3");
			}

			const result = await pool.query(
				"UPDATE public.bodegas SET id_estado = $1 WHERE id_bodega = $2 RETURNING id_bodega, nombre, id_estado",
				[idEstado, idBodega]
			);

			logger.info({ bodegaId: idBodega, nuevoEstado: idEstado }, "Estado de bodega cambiado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idBodega, idEstado }, "Error al cambiar estado de bodega");
			throw error;
		}
	}

	/**
	 * Obtiene los productos con stock en una bodega específica con información completa
	 * @param {number} idBodega - ID de la bodega
	 * @returns {Promise<Array>} Lista de productos con su stock y detalles de factura
	 */
	async obtenerProductosPorBodega(idBodega) {
		try {
			const query = `
				SELECT 
					inv.id_inventario,
					inv.id_producto,
					inv.id_bodega,
					inv.cantidad_lote,
					inv.costo_producto,
					inv.fecha_ingreso,
					inv.id_factura,
					p.codigo as producto_codigo,
					p.nombre as producto_nombre,
					COALESCE(df.precio_unitario, 0) as precio_unitario,
					COALESCE(df.costo_unitario_con_impuesto, 0) as costo_unitario_con_impuesto,
					COALESCE(df.iva_valor, 0) as iva_valor,
					df.id_iva,
					i.nombre as iva_nombre,
					i.valor as iva_porcentaje
				FROM public.inventario inv
				LEFT JOIN public.producto p ON inv.id_producto = p.id_producto
				LEFT JOIN public.detalle_factura df ON inv.id_factura = df.id_factura AND inv.id_producto = df.id_producto
				LEFT JOIN public.ivas i ON df.id_iva = i.id_iva
				WHERE inv.id_bodega = $1
					AND (p.id_estado IS NULL OR p.id_estado IN (1, 2))
				ORDER BY inv.fecha_ingreso DESC, p.nombre, inv.id_inventario
			`;

			const result = await pool.query(query, [idBodega]);
			logger.info({ bodegaId: idBodega, count: result.rows.length }, "Productos por bodega obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error, idBodega }, "Error al obtener productos por bodega");
			throw error;
		}
	}

	/**
	 * Realiza un traslado de productos entre bodegas
	 * @param {number} idBodegaOrigen - ID de la bodega de origen
	 * @param {number} idBodegaDestino - ID de la bodega de destino
	 * @param {Array} traslados - Array de objetos con id_inventario, id_producto, id_factura y cantidad
	 * @returns {Promise<Object>} Resultado del traslado
	 */
	async realizarTraslado(idBodegaOrigen, idBodegaDestino, traslados) {
		const client = await pool.connect();
		
		try {
			await client.query("BEGIN");

			// Validar que las bodegas existan
			const bodegaOrigenCheck = await client.query(
				"SELECT id_bodega FROM public.bodegas WHERE id_bodega = $1",
				[idBodegaOrigen]
			);
			if (bodegaOrigenCheck.rows.length === 0) {
				throw new Error("Bodega de origen no encontrada");
			}

			const bodegaDestinoCheck = await client.query(
				"SELECT id_bodega FROM public.bodegas WHERE id_bodega = $1",
				[idBodegaDestino]
			);
			if (bodegaDestinoCheck.rows.length === 0) {
				throw new Error("Bodega de destino no encontrada");
			}

			if (idBodegaOrigen === idBodegaDestino) {
				throw new Error("La bodega de origen y destino no pueden ser la misma");
			}

			const resultados = [];

			for (const traslado of traslados) {
				const { id_inventario, id_producto, id_factura, cantidad } = traslado;

				// 1. Verificar que el inventario existe y tiene suficiente cantidad
				const inventarioOrigen = await client.query(
					`SELECT id_inventario, id_producto, id_bodega, cantidad_lote, costo_producto, fecha_ingreso, id_factura
					 FROM public.inventario 
					 WHERE id_inventario = $1 AND id_bodega = $2`,
					[id_inventario, idBodegaOrigen]
				);

				if (inventarioOrigen.rows.length === 0) {
					throw new Error(`Inventario con ID ${id_inventario} no encontrado en la bodega de origen`);
				}

				const inventario = inventarioOrigen.rows[0];

				if (inventario.cantidad_lote < cantidad) {
					throw new Error(`Cantidad insuficiente. Disponible: ${inventario.cantidad_lote}, Solicitado: ${cantidad}`);
				}

				// 2. Obtener información del producto y factura para los movimientos
				const productoInfo = await client.query(
					`SELECT p.codigo, p.nombre, df.precio_unitario, df.costo_unitario_con_impuesto
					 FROM public.producto p
					 LEFT JOIN public.detalle_factura df ON df.id_producto = p.id_producto AND df.id_factura = $1
					 WHERE p.id_producto = $2`,
					[id_factura, id_producto]
				);

				const precioUnitario = productoInfo.rows[0]?.precio_unitario || 0;
				const costoUnitarioConImpuesto = productoInfo.rows[0]?.costo_unitario_con_impuesto || precioUnitario;

				// 3. Restar cantidad en bodega origen
				if (inventario.cantidad_lote === cantidad) {
					// Si se mueve toda la cantidad, eliminar el registro
					await client.query(
						"DELETE FROM public.inventario WHERE id_inventario = $1",
						[id_inventario]
					);
				} else {
					// Si queda cantidad, actualizar proporcionalmente el costo
					const costoUnitario = inventario.costo_producto / inventario.cantidad_lote;
					const nuevaCantidad = inventario.cantidad_lote - cantidad;
					const nuevoCosto = costoUnitario * nuevaCantidad;

					await client.query(
						`UPDATE public.inventario 
						 SET cantidad_lote = $1,
						     costo_producto = $2
						 WHERE id_inventario = $3`,
						[nuevaCantidad, nuevoCosto, id_inventario]
					);
				}

				// 4. Verificar si existe el producto en la bodega destino (misma factura)
				const inventarioDestino = await client.query(
					`SELECT id_inventario, cantidad_lote, costo_producto
					 FROM public.inventario
					 WHERE id_bodega = $1 AND id_producto = $2 AND id_factura = $3`,
					[idBodegaDestino, id_producto, id_factura]
				);

				if (inventarioDestino.rows.length > 0) {
					// Existe, sumar cantidad
					const invDestino = inventarioDestino.rows[0];
					const nuevoCostoTotal = invDestino.costo_producto + (costoUnitarioConImpuesto * cantidad);
					const nuevaCantidad = invDestino.cantidad_lote + cantidad;

					await client.query(
						`UPDATE public.inventario
						 SET cantidad_lote = $1,
						     costo_producto = $2
						 WHERE id_inventario = $3`,
						[nuevaCantidad, nuevoCostoTotal, invDestino.id_inventario]
					);
				} else {
					// No existe, crear nuevo registro
					await client.query(
						`INSERT INTO public.inventario (
							id_bodega, id_producto, id_proveedor, fecha_ingreso, id_factura, cantidad_lote, costo_producto
						) VALUES ($1, $2, 
							(SELECT id_proveedor FROM public.facturas WHERE id_facturas = $3),
							NOW(), $3, $4, $5)`,
						[idBodegaDestino, id_producto, id_factura, cantidad, costoUnitarioConImpuesto * cantidad]
					);
				}

				// 5. Crear movimiento de salida en kardex (bodega origen)
				await client.query(
					`INSERT INTO public.movimientos_kardex (
						id_bodega, id_producto, tipo_movimiento, tipo_flujo, cantidad, costo_unitario, costo_total_movimiento, "fecha "
					) VALUES ($1, $2, 'Traslado Salida', 'Salida', $3, $4, $5, NOW())`,
					[idBodegaOrigen, id_producto, cantidad, costoUnitarioConImpuesto, costoUnitarioConImpuesto * cantidad]
				);

				// 6. Crear movimiento de entrada en kardex (bodega destino)
				await client.query(
					`INSERT INTO public.movimientos_kardex (
						id_bodega, id_producto, tipo_movimiento, tipo_flujo, cantidad, costo_unitario, costo_total_movimiento, "fecha "
					) VALUES ($1, $2, 'Traslado Entrada', 'Entrada', $3, $4, $5, NOW())`,
					[idBodegaDestino, id_producto, cantidad, costoUnitarioConImpuesto, costoUnitarioConImpuesto * cantidad]
				);

				resultados.push({
					id_inventario,
					id_producto,
					cantidad,
					exitoso: true
				});
			}

			await client.query("COMMIT");

			logger.info({ 
				bodegaOrigen: idBodegaOrigen, 
				bodegaDestino: idBodegaDestino, 
				cantidadTraslados: resultados.length 
			}, "Traslado realizado exitosamente");

			return {
				success: true,
				traslados: resultados
			};
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error, idBodegaOrigen, idBodegaDestino }, "Error al realizar traslado");
			throw error;
		} finally {
			client.release();
		}
	}
}

module.exports = new BodegasService();

