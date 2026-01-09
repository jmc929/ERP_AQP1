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
			// Verificar qué columnas existen en las tablas
			let tieneIdTraslado = false;
			let nombreColumnaFecha = 'fecha'; // Por defecto
			
			try {
				// Verificar si existe id_traslado en inventario
				await pool.query("SELECT id_traslado FROM public.inventario LIMIT 1");
				tieneIdTraslado = true;
			} catch (e) {
				logger.warn("Columna id_traslado no encontrada en inventario");
			}
			
			// Verificar el nombre real de la columna de fecha en movimientos_kardex
			try {
				const fechaCheck = await pool.query(`
					SELECT column_name 
					FROM information_schema.columns 
					WHERE table_schema = 'public' 
					AND table_name = 'movimientos_kardex' 
					AND column_name LIKE '%fecha%'
				`);
				if (fechaCheck.rows.length > 0) {
					nombreColumnaFecha = fechaCheck.rows[0].column_name;
					logger.info({ nombreColumnaFecha }, "Columna de fecha encontrada en movimientos_kardex");
				}
			} catch (e) {
				logger.warn({ err: e }, "No se pudo verificar la columna de fecha, usando 'fecha' por defecto");
			}
			
			// Construir el nombre de la columna con comillas si tiene espacios
			const fechaCol = nombreColumnaFecha.includes(' ') ? `"${nombreColumnaFecha}"` : nombreColumnaFecha;
			
			let query;
			if (tieneIdTraslado) {
				// Consulta completa con id_traslado - usar placeholder para la columna de fecha
				const queryTemplate = `
					SELECT 
						inv.id_inventario,
						inv.id_producto,
						inv.id_bodega,
						inv.cantidad_lote,
						inv.costo_producto,
						inv.fecha_ingreso,
						inv.id_factura,
						inv.id_traslado,
						p.codigo as producto_codigo,
						p.nombre as producto_nombre,
						COALESCE(df.precio_unitario, 0) as precio_unitario,
						COALESCE(df.costo_unitario_con_impuesto, 0) as costo_unitario_con_impuesto,
						COALESCE(df.iva_valor, 0) as iva_valor,
						COALESCE(df.valor_total, 0) as valor_total,
						df.id_iva,
						i.nombre as iva_nombre,
						i.valor as iva_porcentaje,
						COALESCE(m.nombre, 'N/A') as unidad_medida,
						-- Comprobante: Determinar el origen original basándose en el primer movimiento
						COALESCE(
							(SELECT 
								CASE
									WHEN mk.tipo_movimiento LIKE '%Traslado Entrada%' OR mk.tipo_movimiento LIKE '%Traslado%' THEN
										'T-' || COALESCE(
											(SELECT t2.id_traslado::text
											 FROM public.traslados t2
											 WHERE t2.bodega_destino_id = inv.id_bodega
											   AND DATE(t2.fecha_traslado) <= DATE(mk.__FECHA_COL__)
											 ORDER BY t2.id_traslado ASC
											 LIMIT 1
											),
											inv.id_traslado::text,
											'0'
										)
									ELSE
										'FC-' || COALESCE(
											(SELECT f2.id_facturas::text
											 FROM public.facturas f2
											 INNER JOIN public.detalle_factura df2 ON f2.id_facturas = df2.id_factura
											 WHERE df2.id_producto = inv.id_producto
											   AND DATE(f2.fecha_creacion) <= DATE(mk.__FECHA_COL__)
											 ORDER BY f2.id_facturas ASC
											 LIMIT 1
											),
											inv.id_factura::text,
											'0'
										)
								END
							 FROM public.movimientos_kardex mk
							 WHERE mk.id_bodega = inv.id_bodega
							   AND mk.id_producto = inv.id_producto
							   AND mk.tipo_flujo = 'Entrada'
							 ORDER BY mk.__FECHA_COL__ ASC, mk.id_movimientos ASC
							 LIMIT 1
							),
							CASE
								WHEN inv.id_traslado IS NOT NULL THEN 'T-' || inv.id_traslado::text
								WHEN inv.id_factura IS NOT NULL THEN 'FC-' || inv.id_factura::text
								ELSE 'N/A'
							END
						) as comprobante,
						-- Fecha: del primer movimiento de entrada o de la factura/traslado directo
						COALESCE(
							(SELECT mk.__FECHA_COL__
							 FROM public.movimientos_kardex mk
							 WHERE mk.id_bodega = inv.id_bodega
							   AND mk.id_producto = inv.id_producto
							   AND mk.tipo_flujo = 'Entrada'
							 ORDER BY mk.__FECHA_COL__ ASC, mk.id_movimientos ASC
							 LIMIT 1
							),
							CASE
								WHEN inv.id_traslado IS NOT NULL THEN t.fecha_traslado
								WHEN inv.id_factura IS NOT NULL THEN f.fecha_creacion
								ELSE inv.fecha_ingreso
							END
						) as fecha_comprobante,
						COALESCE(
							(SELECT SUM(mk.cantidad)
							 FROM public.movimientos_kardex mk
							 WHERE mk.id_bodega = inv.id_bodega
							   AND mk.id_producto = inv.id_producto
							   AND mk.tipo_flujo = 'Entrada'
							),
							0
						) as cantidad_entrada,
						COALESCE(
							(SELECT SUM(mk.cantidad)
							 FROM public.movimientos_kardex mk
							 WHERE mk.id_bodega = inv.id_bodega
							   AND mk.id_producto = inv.id_producto
							   AND mk.tipo_flujo = 'Salida'
							),
							0
						) as cantidad_salida,
						inv.cantidad_lote as saldo_cantidad
					FROM public.inventario inv
					LEFT JOIN public.producto p ON inv.id_producto = p.id_producto
					LEFT JOIN public.detalle_factura df ON inv.id_factura = df.id_factura AND inv.id_producto = df.id_producto
					LEFT JOIN public.facturas f ON inv.id_factura = f.id_facturas
					LEFT JOIN public.traslados t ON inv.id_traslado = t.id_traslado
					LEFT JOIN public.ivas i ON df.id_iva = i.id_iva
					LEFT JOIN public.medida m ON p.id_medida = m.id_medida
					WHERE inv.id_bodega = $1
						AND (p.id_estado IS NULL OR p.id_estado IN (1, 2))
					ORDER BY inv.fecha_ingreso DESC, p.nombre, inv.id_inventario
				`;
				query = queryTemplate.replace(/__FECHA_COL__/g, fechaCol);
			} else {
				// Consulta sin id_traslado
				query = `
					SELECT 
						inv.id_inventario,
						inv.id_producto,
						inv.id_bodega,
						inv.cantidad_lote,
						inv.costo_producto,
						inv.fecha_ingreso,
						inv.id_factura,
						NULL as id_traslado,
						p.codigo as producto_codigo,
						p.nombre as producto_nombre,
						COALESCE(df.precio_unitario, 0) as precio_unitario,
						COALESCE(df.costo_unitario_con_impuesto, 0) as costo_unitario_con_impuesto,
						COALESCE(df.iva_valor, 0) as iva_valor,
						COALESCE(df.valor_total, 0) as valor_total,
						df.id_iva,
						i.nombre as iva_nombre,
						i.valor as iva_porcentaje,
						COALESCE(m.nombre, 'N/A') as unidad_medida,
						CASE
							WHEN inv.id_factura IS NOT NULL THEN 'FC-' || inv.id_factura::text
							ELSE 'N/A'
						END as comprobante,
						COALESCE(f.fecha_creacion, inv.fecha_ingreso) as fecha_comprobante,
						COALESCE(
							(SELECT SUM(mk.cantidad)
							 FROM public.movimientos_kardex mk
							 WHERE mk.id_bodega = inv.id_bodega
							   AND mk.id_producto = inv.id_producto
							   AND mk.tipo_flujo = 'Entrada'
							),
							0
						) as cantidad_entrada,
						COALESCE(
							(SELECT SUM(mk.cantidad)
							 FROM public.movimientos_kardex mk
							 WHERE mk.id_bodega = inv.id_bodega
							   AND mk.id_producto = inv.id_producto
							   AND mk.tipo_flujo = 'Salida'
							),
							0
						) as cantidad_salida,
						inv.cantidad_lote as saldo_cantidad
					FROM public.inventario inv
					LEFT JOIN public.producto p ON inv.id_producto = p.id_producto
					LEFT JOIN public.detalle_factura df ON inv.id_factura = df.id_factura AND inv.id_producto = df.id_producto
					LEFT JOIN public.facturas f ON inv.id_factura = f.id_facturas
					LEFT JOIN public.ivas i ON df.id_iva = i.id_iva
					LEFT JOIN public.medida m ON p.id_medida = m.id_medida
					WHERE inv.id_bodega = $1
						AND (p.id_estado IS NULL OR p.id_estado IN (1, 2))
					ORDER BY inv.fecha_ingreso DESC, p.nombre, inv.id_inventario
				`;
			}

			const result = await pool.query(query, [idBodega]);
			logger.info({ bodegaId: idBodega, count: result.rows.length }, "Productos por bodega obtenidos exitosamente");
			
			// Validar que todos los campos requeridos estén presentes
			const productosValidados = result.rows.map(row => ({
				...row,
				comprobante: row.comprobante || 'N/A',
				fecha_comprobante: row.fecha_comprobante || row.fecha_ingreso || new Date().toISOString(),
				cantidad_entrada: Number(row.cantidad_entrada) || 0,
				cantidad_salida: Number(row.cantidad_salida) || 0,
				saldo_cantidad: Number(row.saldo_cantidad) || Number(row.cantidad_lote) || 0
			}));
			
			return productosValidados;
		} catch (error) {
			logger.error({ err: error, idBodega, stack: error.stack }, "Error al obtener productos por bodega");
			throw error;
		}
	}

	/**
	 * Realiza un traslado de productos entre bodegas
	 * @param {number} idBodegaOrigen - ID de la bodega de origen
	 * @param {number} idBodegaDestino - ID de la bodega de destino
	 * @param {number} idUsuario - ID del usuario que realiza el traslado
	 * @param {string|null} observacion - Observación del traslado (opcional)
	 * @param {Array} traslados - Array de objetos con id_inventario, id_producto, id_factura y cantidad
	 * @returns {Promise<Object>} Resultado del traslado
	 */
	async realizarTraslado(idBodegaOrigen, idBodegaDestino, idUsuario, observacion, traslados) {
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

			// Validar que el usuario exista
			const usuarioCheck = await client.query(
				"SELECT id_usuarios FROM public.usuarios WHERE id_usuarios = $1",
				[idUsuario]
			);
			if (usuarioCheck.rows.length === 0) {
				throw new Error("Usuario no encontrado");
			}

			// 1. Crear registro en la tabla traslados
			const trasladoResult = await client.query(
				`INSERT INTO public.traslados (
					fecha_traslado,
					id_usuario,
					bodega_origen_id,
					bodega_destino_id,
					observacion
				) VALUES (CURRENT_DATE, $1, $2, $3, $4)
				RETURNING id_traslado`,
				[idUsuario, idBodegaOrigen, idBodegaDestino, observacion]
			);

			if (trasladoResult.rows.length === 0) {
				throw new Error("No se pudo crear el registro de traslado");
			}

			const idTraslado = trasladoResult.rows[0].id_traslado;

			logger.info({ 
				idTraslado: idTraslado,
				idUsuario: idUsuario,
				bodegaOrigen: idBodegaOrigen,
				bodegaDestino: idBodegaDestino,
				observacion: observacion
			}, "Registro de traslado creado");

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

				// 4. Verificar si existe el producto en la bodega destino
				// Primero buscar por misma factura (mismo lote)
				logger.info({ 
					bodegaDestino: idBodegaDestino, 
					idProducto: id_producto, 
					idFactura: id_factura,
					cantidad: cantidad
				}, "Iniciando búsqueda de inventario destino");
				
				let inventarioDestino = await client.query(
					`SELECT id_inventario, cantidad_lote, costo_producto, id_factura
					 FROM public.inventario
					 WHERE id_bodega = $1 AND id_producto = $2 AND id_factura = $3`,
					[idBodegaDestino, id_producto, id_factura]
				);

				logger.info({ 
					bodegaDestino: idBodegaDestino, 
					idProducto: id_producto, 
					idFactura: id_factura,
					encontradosMismaFactura: inventarioDestino.rows.length,
					registrosEncontrados: inventarioDestino.rows
				}, "Búsqueda de inventario destino (misma factura)");

				if (inventarioDestino.rows.length > 0) {
					// Existe con la misma factura (mismo lote), sumar cantidad
					const invDestino = inventarioDestino.rows[0];
					// Convertir explícitamente a números, asegurando que sean números
					const cantidadAnterior = Number(invDestino.cantidad_lote) || 0;
					const costoAnterior = Number(invDestino.costo_producto) || 0;
					const cantidadTrasladada = Number(cantidad) || 0;
					const costoUnitario = Number(costoUnitarioConImpuesto) || 0;
					
					// Asegurar que son números antes de sumar
					if (isNaN(cantidadAnterior) || isNaN(cantidadTrasladada)) {
						throw new Error(`Error de conversión: cantidadAnterior=${cantidadAnterior}, cantidadTrasladada=${cantidadTrasladada}`);
					}
					
					const nuevoCostoTotal = Number((costoAnterior + (costoUnitario * cantidadTrasladada)).toFixed(2));
					const nuevaCantidad = Number((cantidadAnterior + cantidadTrasladada).toFixed(2));

					logger.info({ 
						idInventario: invDestino.id_inventario,
						cantidadAnterior: cantidadAnterior,
						cantidadTrasladada: cantidadTrasladada,
						nuevaCantidad: nuevaCantidad,
						costoAnterior: costoAnterior,
						costoUnitario: costoUnitario,
						nuevoCostoTotal: nuevoCostoTotal
					}, "Datos para UPDATE en destino (mismo lote)");

					const updateResult = await client.query(
						`UPDATE public.inventario
						 SET cantidad_lote = $1,
						     costo_producto = $2
						 WHERE id_inventario = $3
						 RETURNING id_inventario, cantidad_lote, costo_producto, id_factura`,
						[nuevaCantidad, nuevoCostoTotal, invDestino.id_inventario]
					);
					
					// Validar que se actualizó correctamente
					if (updateResult.rowCount === 0) {
						throw new Error(`No se pudo actualizar el inventario destino con id_inventario ${invDestino.id_inventario}`);
					}
					
					if (updateResult.rows.length === 0) {
						throw new Error(`El UPDATE no devolvió datos para id_inventario ${invDestino.id_inventario}`);
					}
					
					// Verificar que los valores se actualizaron correctamente
					const cantidadActualizada = parseFloat(updateResult.rows[0].cantidad_lote);
					if (Math.abs(cantidadActualizada - nuevaCantidad) > 0.01) {
						throw new Error(`Error: La cantidad actualizada (${cantidadActualizada}) no coincide con la esperada (${nuevaCantidad})`);
					}
					
					logger.info({ 
						idInventario: invDestino.id_inventario, 
						cantidadAnterior: cantidadAnterior, 
						cantidadNueva: nuevaCantidad,
						cantidadActualizada: cantidadActualizada,
						cantidadTrasladada: cantidadTrasladada,
						rowsUpdated: updateResult.rowCount,
						datosActualizados: updateResult.rows[0]
					}, "Inventario destino actualizado (mismo lote) - VERIFICADO");
				} else {
					// No existe con la misma factura, buscar si existe el producto en esa bodega (cualquier factura)
					logger.info({ 
						bodegaDestino: idBodegaDestino, 
						idProducto: id_producto
					}, "No se encontró con misma factura, buscando cualquier factura");
					
					const inventarioDestinoAlternativo = await client.query(
						`SELECT id_inventario, cantidad_lote, costo_producto, id_factura
						 FROM public.inventario
						 WHERE id_bodega = $1 AND id_producto = $2
						 ORDER BY fecha_ingreso DESC
						 LIMIT 1`,
						[idBodegaDestino, id_producto]
					);

					logger.info({ 
						bodegaDestino: idBodegaDestino, 
						idProducto: id_producto, 
						encontradosCualquierFactura: inventarioDestinoAlternativo.rows.length,
						registrosEncontrados: inventarioDestinoAlternativo.rows
					}, "Búsqueda de inventario destino (cualquier factura)");

					if (inventarioDestinoAlternativo.rows.length > 0) {
						// Existe el producto pero de diferente factura, sumar cantidad al registro existente
						const invDestino = inventarioDestinoAlternativo.rows[0];
						// Convertir explícitamente a números, asegurando que sean números
						const cantidadAnterior = Number(invDestino.cantidad_lote) || 0;
						const costoAnterior = Number(invDestino.costo_producto) || 0;
						const cantidadTrasladada = Number(cantidad) || 0;
						const costoUnitario = Number(costoUnitarioConImpuesto) || 0;
						
						// Asegurar que son números antes de sumar
						if (isNaN(cantidadAnterior) || isNaN(cantidadTrasladada)) {
							throw new Error(`Error de conversión: cantidadAnterior=${cantidadAnterior}, cantidadTrasladada=${cantidadTrasladada}`);
						}
						
						const nuevoCostoTotal = Number((costoAnterior + (costoUnitario * cantidadTrasladada)).toFixed(2));
						const nuevaCantidad = Number((cantidadAnterior + cantidadTrasladada).toFixed(2));

						logger.info({ 
							idInventario: invDestino.id_inventario,
							cantidadAnterior: cantidadAnterior,
							cantidadTrasladada: cantidadTrasladada,
							nuevaCantidad: nuevaCantidad,
							costoAnterior: costoAnterior,
							costoUnitario: costoUnitario,
							nuevoCostoTotal: nuevoCostoTotal
						}, "Datos para UPDATE en destino (diferente lote)");

						const updateResult = await client.query(
							`UPDATE public.inventario
							 SET cantidad_lote = $1,
							     costo_producto = $2
							 WHERE id_inventario = $3
							 RETURNING id_inventario, cantidad_lote, costo_producto, id_factura`,
							[nuevaCantidad, nuevoCostoTotal, invDestino.id_inventario]
						);
						
						// Validar que se actualizó correctamente
						if (updateResult.rowCount === 0) {
							throw new Error(`No se pudo actualizar el inventario destino con id_inventario ${invDestino.id_inventario}`);
						}
						
						if (updateResult.rows.length === 0) {
							throw new Error(`El UPDATE no devolvió datos para id_inventario ${invDestino.id_inventario}`);
						}
						
						// Verificar que los valores se actualizaron correctamente
						const cantidadActualizada = parseFloat(updateResult.rows[0].cantidad_lote);
						if (Math.abs(cantidadActualizada - nuevaCantidad) > 0.01) {
							throw new Error(`Error: La cantidad actualizada (${cantidadActualizada}) no coincide con la esperada (${nuevaCantidad})`);
						}
						
						logger.info({ 
							idInventario: invDestino.id_inventario, 
							cantidadAnterior: cantidadAnterior, 
							cantidadNueva: nuevaCantidad,
							cantidadActualizada: cantidadActualizada,
							cantidadTrasladada: cantidadTrasladada,
							rowsUpdated: updateResult.rowCount,
							datosActualizados: updateResult.rows[0],
							facturaAnterior: invDestino.id_factura,
							facturaNueva: id_factura
						}, "Inventario destino actualizado (diferente lote) - VERIFICADO");
					} else {
						// No existe el producto en esa bodega, crear nuevo registro
						logger.info({ 
							idBodega: idBodegaDestino, 
							idProducto: id_producto,
							idFactura: id_factura,
							cantidad: cantidad,
							costoUnitarioConImpuesto: costoUnitarioConImpuesto
						}, "No se encontró producto en destino, creando nuevo registro");
						
						// Obtener el proveedor de la factura
						const proveedorResult = await client.query(
							`SELECT id_proveedor FROM public.facturas WHERE id_facturas = $1`,
							[id_factura]
						);
						
						if (proveedorResult.rows.length === 0) {
							throw new Error(`No se encontró la factura con id ${id_factura} para obtener el proveedor`);
						}
						
						const idProveedor = proveedorResult.rows[0].id_proveedor;
						const costoTotal = costoUnitarioConImpuesto * cantidad;
						
						logger.info({ 
							idProveedor: idProveedor,
							costoTotal: costoTotal
						}, "Datos para INSERT en inventario destino");
						
						const insertResult = await client.query(
							`INSERT INTO public.inventario (
								id_bodega, id_producto, id_proveedor, fecha_ingreso, id_factura, cantidad_lote, costo_producto, id_traslado
							) VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7)
							RETURNING id_inventario, cantidad_lote, costo_producto`,
							[idBodegaDestino, id_producto, idProveedor, id_factura, cantidad, costoTotal, idTraslado]
						);
						
						if (insertResult.rows.length === 0) {
							throw new Error(`No se pudo crear el registro de inventario en destino`);
						}
						
						logger.info({ 
							idBodega: idBodegaDestino, 
							idProducto: id_producto, 
							cantidad: cantidad,
							nuevoRegistro: insertResult.rows[0]
						}, "Nuevo registro de inventario creado en destino");
					}
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

			// Verificar el estado final antes de commit
			logger.info({ 
				bodegaOrigen: idBodegaOrigen, 
				bodegaDestino: idBodegaDestino, 
				cantidadTraslados: resultados.length,
				resultados: resultados
			}, "Estado antes de COMMIT");
			
			// Confirmar la transacción
			await client.query("COMMIT");
			
			// Verificar el estado después del commit
			for (const resultado of resultados) {
				const verificacionDestino = await pool.query(
					`SELECT id_inventario, cantidad_lote, costo_producto, id_factura
					 FROM public.inventario
					 WHERE id_bodega = $1 AND id_producto = $2`,
					[idBodegaDestino, resultado.id_producto]
				);
				
				logger.info({ 
					bodegaDestino: idBodegaDestino,
					idProducto: resultado.id_producto,
					registrosEnDestino: verificacionDestino.rows.length,
					detalles: verificacionDestino.rows
				}, "Verificación POST-COMMIT en bodega destino");
			}
			
			logger.info({ 
				bodegaOrigen: idBodegaOrigen, 
				bodegaDestino: idBodegaDestino, 
				cantidadTraslados: resultados.length 
			}, "Traslado realizado exitosamente - TRANSACCIÓN COMMITADA");

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

	/**
	 * Obtiene los movimientos de kardex de un producto en una bodega específica
	 * @param {number} idBodega - ID de la bodega
	 * @param {number} idProducto - ID del producto
	 * @returns {Promise<Array>} Lista de movimientos de kardex
	 */
	async obtenerMovimientosKardex(idBodega, idProducto) {
		try {
			// Consulta usando los nombres de columnas que sabemos que existen
			// Basado en el código de compras.service.js, sabemos que la columna de fecha es "fecha " (con espacio)
			// y el ID es id_movimientos (según el RETURNING en compras.service.js línea 400)
			const query = `
				SELECT 
					mk.id_movimientos as id_movimiento_kardex,
					mk.id_bodega,
					mk.id_producto,
					mk.tipo_movimiento,
					mk.tipo_flujo,
					mk.cantidad,
					mk.costo_unitario,
					mk.costo_total_movimiento,
					mk."fecha " as fecha,
					COALESCE(b.nombre, 'N/A') as bodega_nombre,
					COALESCE(p.codigo, '') as producto_codigo,
					COALESCE(p.nombre, '') as producto_nombre
				FROM public.movimientos_kardex mk
				LEFT JOIN public.bodegas b ON mk.id_bodega = b.id_bodega
				LEFT JOIN public.producto p ON mk.id_producto = p.id_producto
				WHERE mk.id_bodega = $1 AND mk.id_producto = $2
				ORDER BY mk."fecha " DESC, mk.id_movimientos DESC
			`;

			const result = await pool.query(query, [idBodega, idProducto]);
			logger.info({ bodegaId: idBodega, productoId: idProducto, count: result.rows.length }, "Movimientos kardex obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ 
				err: error, 
				idBodega, 
				idProducto, 
				message: error.message,
				stack: error.stack 
			}, "Error al obtener movimientos kardex");
			throw error;
		}
	}
}

module.exports = new BodegasService();

