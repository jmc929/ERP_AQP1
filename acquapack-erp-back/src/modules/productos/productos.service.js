const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con productos
 */
class ProductosService {
	/**
	 * Obtiene el ID del estado "Eliminado" desde la base de datos
	 * @returns {Promise<number|null>} ID del estado eliminado
	 */
	async obtenerIdEstadoEliminado() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'eliminado' AND modulo = 'productos' LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Eliminado' para productos");
				return null;
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado eliminado");
			return null;
		}
	}

	/**
	 * Obtiene el ID del estado "Activo" desde la base de datos
	 * @returns {Promise<number|null>} ID del estado activo
	 */
	async obtenerIdEstadoActivo() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'activo' AND modulo = 'productos' LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Activo' para productos");
				return null;
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado activo");
			return null;
		}
	}

	/**
	 * Obtiene productos con paginación y filtros
	 * @param {Object} filtros - Filtros de búsqueda
	 * @param {number} pagina - Número de página
	 * @param {number} limite - Cantidad de registros por página
	 * @returns {Promise<Object>} Productos paginados
	 */
	async obtenerProductos(filtros = {}, pagina = 1, limite = 20) {
		try {
			const offset = (pagina - 1) * limite;
			const condiciones = [];
			const valores = [];
			let contador = 1;

			// Construir condiciones WHERE dinámicamente
			if (filtros.busqueda) {
				condiciones.push(`(
					p.nombre ILIKE $${contador} OR 
					p.codigo ILIKE $${contador} OR 
					p.codigo_barras ILIKE $${contador}
				)`);
				valores.push(`%${filtros.busqueda}%`);
				contador++;
			}

			if (filtros.id_familia) {
				condiciones.push(`p.id_familia = $${contador}`);
				valores.push(filtros.id_familia);
				contador++;
			}

			if (filtros.id_grupos_producto) {
				condiciones.push(`p.id_grupos_producto = $${contador}`);
				valores.push(filtros.id_grupos_producto);
				contador++;
			}

			if (filtros.id_estado) {
				condiciones.push(`p.id_estado = $${contador}`);
				valores.push(filtros.id_estado);
				contador++;
			}

			// Excluir productos archivados por defecto
			// Solo si no se está filtrando específicamente por un estado
			if (!filtros.id_estado && !filtros.mostrar_archivados) {
				const idEstadoEliminado = await this.obtenerIdEstadoEliminado();
				if (idEstadoEliminado) {
					condiciones.push(`p.id_estado != $${contador}`);
					valores.push(idEstadoEliminado);
					contador++;
				}
			}

			const whereClause = condiciones.length > 0 
				? `WHERE ${condiciones.join(" AND ")}` 
				: "";

			// Consulta para obtener productos
			const query = `
				SELECT 
					p.id_producto,
					p.codigo,
					p.nombre,
					p.codigo_barras,
					gp.nombre as grupo_nombre,
					fp.nombre as familia_nombre,
					p.existencia,
					m.nombre as medida_nombre,
					p.cantidad_total,
					p.cantidad_minima,
					p.cantidad_maxima,
					e.nombre as estado_nombre,
					e.color as estado_color,
					p.id_estado
				FROM public.producto p
				LEFT JOIN public.grupos_productos gp ON p.id_grupos_producto = gp.id_grupos_productos
				LEFT JOIN public.familia_producto fp ON p.id_familia = fp.id_familia_producto
				LEFT JOIN public.medida m ON p.id_medida = m.id_medida
				LEFT JOIN public.estado e ON p.id_estado = e.id_estado
				${whereClause}
				ORDER BY p.nombre
				LIMIT $${contador} OFFSET $${contador + 1}
			`;

			valores.push(limite, offset);

			// Consulta para contar total de registros
			const countQuery = `
				SELECT COUNT(*) as total
				FROM public.producto p
				${whereClause}
			`;

			const [productosResult, countResult] = await Promise.all([
				pool.query(query, valores),
				pool.query(countQuery, valores.slice(0, -2)) // Excluir LIMIT y OFFSET
			]);

			const total = parseInt(countResult.rows[0].total);
			const totalPaginas = Math.ceil(total / limite);

			return {
				productos: productosResult.rows,
				paginacion: {
					paginaActual: pagina,
					totalPaginas,
					totalRegistros: total,
					limite,
					hasNextPage: pagina < totalPaginas,
					hasPrevPage: pagina > 1
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener productos");
			throw error;
		}
	}

	/**
	 * Obtiene los catálogos para los filtros
	 * @returns {Promise<Object>} Catálogos
	 */
	async obtenerCatalogos() {
		try {
			const [
				familias,
				grupos,
				estados,
				medidas
			] = await Promise.all([
				pool.query("SELECT id_familia_producto, nombre FROM public.familia_producto ORDER BY nombre"),
				pool.query("SELECT id_grupos_productos, nombre FROM public.grupos_productos ORDER BY nombre"),
				pool.query("SELECT id_estado, nombre FROM public.estado WHERE modulo = 'Inventario' OR modulo = 'Global' ORDER BY nombre"),
				pool.query("SELECT id_medida, nombre FROM public.medida ORDER BY nombre")
			]);

			return {
				familias: familias.rows,
				grupos: grupos.rows,
				estados: estados.rows,
				medidas: medidas.rows
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener catálogos de productos");
			throw error;
		}
	}

	/**
	 * Obtiene el siguiente código de barras disponible
	 * Formato: 100 + siguiente ID (ej: si hay 1000 productos, sería 1001001)
	 * @returns {Promise<string>} Código de barras generado
	 */
	async obtenerSiguienteCodigoBarras() {
		try {
			const query = `
				SELECT COALESCE(MAX(id_producto), 0) + 1 as siguiente_id
				FROM public.producto
			`;
			const result = await pool.query(query);
			const siguienteId = result.rows[0].siguiente_id;
			return `100${siguienteId}`;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener siguiente código de barras");
			throw error;
		}
	}

	/**
	 * Obtiene un producto por su ID
	 * @param {number} id_producto - ID del producto
	 * @returns {Promise<Object>} Producto
	 */
	async obtenerProductoPorId(id_producto) {
		try {
			const query = `
				SELECT 
					p.id_producto,
					p.codigo,
					p.nombre,
					p.id_grupos_producto,
					gp.nombre as grupo_nombre,
					p.id_familia,
					fp.nombre as familia_nombre,
					p.existencia,
					p.codigo_barras,
					m.id_medida,
					m.nombre as medida_nombre,
					p.cantidad_total,
					p.cantidad_minima,
					p.cantidad_maxima,
					p.id_estado,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.producto p
				LEFT JOIN public.grupos_productos gp ON p.id_grupos_producto = gp.id_grupos_productos
				LEFT JOIN public.familia_producto fp ON p.id_familia = fp.id_familia_producto
				LEFT JOIN public.medida m ON p.id_medida = m.id_medida
				LEFT JOIN public.estado e ON p.id_estado = e.id_estado
				WHERE p.id_producto = $1
			`;
			const result = await pool.query(query, [id_producto]);
			
			if (result.rows.length === 0) {
				throw new Error("Producto no encontrado");
			}
			
			logger.info({ productoId: id_producto }, "Producto obtenido exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al obtener producto por ID");
			throw error;
		}
	}

	/**
	 * Actualiza un producto existente
	 * @param {number} id_producto - ID del producto a actualizar
	 * @param {Object} datosProducto - Datos del producto a actualizar
	 * @returns {Promise<Object>} Producto actualizado
	 */
	async actualizarProducto(id_producto, datosProducto) {
		const client = await pool.connect();
		
		try {
			await client.query("BEGIN");

			// Validar que el producto exista
			const productoExistente = await client.query(
				"SELECT id_producto FROM public.producto WHERE id_producto = $1",
				[id_producto]
			);

			if (productoExistente.rows.length === 0) {
				throw new Error("Producto no encontrado");
			}

			// Validar que el código no exista en otro producto (si se proporciona)
			if (datosProducto.codigo) {
				const codigoExistente = await client.query(
					"SELECT id_producto FROM public.producto WHERE codigo = $1 AND id_producto != $2",
					[datosProducto.codigo, id_producto]
				);

				if (codigoExistente.rows.length > 0) {
					throw new Error("Ya existe otro producto con este código");
				}
			}

			// Construir la consulta UPDATE dinámicamente
			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosProducto.codigo !== undefined) {
				campos.push(`codigo = $${contador}`);
				valores.push(datosProducto.codigo || null);
				contador++;
			}

			if (datosProducto.id_grupos_producto !== undefined) {
				campos.push(`id_grupos_producto = $${contador}`);
				valores.push(datosProducto.id_grupos_producto || null);
				contador++;
			}

			if (datosProducto.nombre !== undefined) {
				campos.push(`nombre = $${contador}`);
				valores.push(datosProducto.nombre);
				contador++;
			}

			if (datosProducto.id_familia !== undefined) {
				campos.push(`id_familia = $${contador}`);
				valores.push(datosProducto.id_familia || null);
				contador++;
			}

			if (datosProducto.existencia !== undefined) {
				campos.push(`existencia = $${contador}`);
				valores.push(datosProducto.existencia);
				contador++;
			}

			if (datosProducto.id_medida !== undefined) {
				campos.push(`id_medida = $${contador}`);
				valores.push(datosProducto.id_medida || null);
				contador++;
			}

			if (datosProducto.cantidad_total !== undefined) {
				campos.push(`cantidad_total = $${contador}`);
				valores.push(datosProducto.cantidad_total || 0);
				contador++;
			}

			if (datosProducto.cantidad_minima !== undefined) {
				campos.push(`cantidad_minima = $${contador}`);
				valores.push(datosProducto.cantidad_minima || 0);
				contador++;
			}

			if (datosProducto.cantidad_maxima !== undefined) {
				campos.push(`cantidad_maxima = $${contador}`);
				valores.push(datosProducto.cantidad_maxima || 0);
				contador++;
			}

			if (datosProducto.id_estado !== undefined) {
				campos.push(`id_estado = $${contador}`);
				valores.push(datosProducto.id_estado);
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			// Agregar el ID del producto al final
			valores.push(id_producto);

			const updateQuery = `
				UPDATE public.producto
				SET ${campos.join(", ")}
				WHERE id_producto = $${contador}
				RETURNING id_producto, codigo, nombre, codigo_barras
			`;

			const resultado = await client.query(updateQuery, valores);
			const productoActualizado = resultado.rows[0];

			await client.query("COMMIT");

			logger.info({ 
				productoId: productoActualizado.id_producto, 
				codigo: productoActualizado.codigo 
			}, "Producto actualizado exitosamente");

			return productoActualizado;
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al actualizar producto");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Crea un nuevo producto
	 * @param {Object} datosProducto - Datos del producto a crear
	 * @returns {Promise<Object>} Producto creado
	 */
	async crearProducto(datosProducto) {
		const client = await pool.connect();
		
		try {
			await client.query("BEGIN");

			// Validar que el código no exista (si se proporciona)
			if (datosProducto.codigo) {
				const codigoExistente = await client.query(
					"SELECT id_producto FROM public.producto WHERE codigo = $1",
					[datosProducto.codigo]
				);

				if (codigoExistente.rows.length > 0) {
					throw new Error("Ya existe un producto con este código");
				}
			}

			// Generar código de barras automáticamente
			const siguienteIdQuery = await client.query(
				"SELECT COALESCE(MAX(id_producto), 0) + 1 as siguiente_id FROM public.producto"
			);
			const siguienteId = siguienteIdQuery.rows[0].siguiente_id;
			const codigoBarras = `100${siguienteId}`;

			// Insertar el producto
			const insertQuery = `
				INSERT INTO public.producto (
					codigo,
					id_grupos_producto,
					nombre,
					id_familia,
					existencia,
					codigo_barras,
					cantidad_total,
					cantidad_minima,
					cantidad_maxima,
					id_estado,
					id_medida
				) VALUES (
					$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
				) RETURNING id_producto, codigo, nombre, codigo_barras
			`;

			// Si no se proporcionó id_estado, obtener el ID del estado "Activo"
			let idEstado = datosProducto.id_estado;
			if (!idEstado) {
				idEstado = await this.obtenerIdEstadoActivo();
			}

			const valores = [
				datosProducto.codigo || null,
				datosProducto.id_grupos_producto || null,
				datosProducto.nombre,
				datosProducto.id_familia || null,
				datosProducto.existencia !== undefined ? datosProducto.existencia : true,
				codigoBarras,
				datosProducto.cantidad_total || 0,
				datosProducto.cantidad_minima || 0,
				datosProducto.cantidad_maxima || 0,
				idEstado,
				datosProducto.id_medida || null
			];

			const resultado = await client.query(insertQuery, valores);
			const productoCreado = resultado.rows[0];

			await client.query("COMMIT");

			logger.info({ 
				productoId: productoCreado.id_producto, 
				codigo: productoCreado.codigo 
			}, "Producto creado exitosamente");

			return productoCreado;
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al crear producto");
			throw error;
		} finally {
			client.release();
		}
	}
}

module.exports = new ProductosService();

