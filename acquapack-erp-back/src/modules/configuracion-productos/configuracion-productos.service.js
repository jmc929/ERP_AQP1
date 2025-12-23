const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");
const PDFDocument = require("pdfkit");
const bwipjs = require("bwip-js");

/**
 * Servicio para operaciones de configuración de productos
 */
class ConfiguracionProductosService {
	/**
	 * Obtiene todos los grupos de productos
	 * @returns {Promise<Array>} Lista de grupos
	 */
	async obtenerGrupos() {
		try {
			const result = await pool.query(
				"SELECT id_grupos_productos, nombre FROM public.grupos_productos ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Grupos obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener grupos");
			throw error;
		}
	}

	/**
	 * Crea un nuevo grupo
	 * @param {Object} datosGrupo - Datos del grupo
	 * @returns {Promise<Object>} Grupo creado
	 */
	async crearGrupo(datosGrupo) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_grupos_productos FROM public.grupos_productos WHERE nombre = $1",
				[datosGrupo.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un grupo con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.grupos_productos (nombre) VALUES ($1) RETURNING id_grupos_productos, nombre",
				[datosGrupo.nombre]
			);

			logger.info({ grupoId: result.rows[0].id_grupos_productos }, "Grupo creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear grupo");
			throw error;
		}
	}

	/**
	 * Actualiza un grupo
	 * @param {number} id - ID del grupo
	 * @param {Object} datosGrupo - Datos actualizados
	 * @returns {Promise<Object>} Grupo actualizado
	 */
	async actualizarGrupo(id, datosGrupo) {
		try {
			// Validar que el grupo exista
			const grupoExistente = await pool.query(
				"SELECT id_grupos_productos FROM public.grupos_productos WHERE id_grupos_productos = $1",
				[id]
			);

			if (grupoExistente.rows.length === 0) {
				throw new Error("Grupo no encontrado");
			}

			// Validar que el nombre no exista en otro grupo
			if (datosGrupo.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_grupos_productos FROM public.grupos_productos WHERE nombre = $1 AND id_grupos_productos != $2",
					[datosGrupo.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro grupo con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.grupos_productos SET nombre = $1 WHERE id_grupos_productos = $2 RETURNING id_grupos_productos, nombre",
				[datosGrupo.nombre, id]
			);

			logger.info({ grupoId: id }, "Grupo actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar grupo");
			throw error;
		}
	}

	/**
	 * Elimina un grupo
	 * @param {number} id - ID del grupo
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarGrupo(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.grupos_productos WHERE id_grupos_productos = $1 RETURNING id_grupos_productos",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Grupo no encontrado");
			}

			logger.info({ grupoId: id }, "Grupo eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar grupo");
			throw error;
		}
	}

	/**
	 * Obtiene todas las familias de productos
	 * @returns {Promise<Array>} Lista de familias
	 */
	async obtenerFamilias() {
		try {
			const result = await pool.query(
				"SELECT id_familia_producto, nombre FROM public.familia_producto ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Familias obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener familias");
			throw error;
		}
	}

	/**
	 * Crea una nueva familia
	 * @param {Object} datosFamilia - Datos de la familia
	 * @returns {Promise<Object>} Familia creada
	 */
	async crearFamilia(datosFamilia) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_familia_producto FROM public.familia_producto WHERE nombre = $1",
				[datosFamilia.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una familia con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.familia_producto (nombre) VALUES ($1) RETURNING id_familia_producto, nombre",
				[datosFamilia.nombre]
			);

			logger.info({ familiaId: result.rows[0].id_familia_producto }, "Familia creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear familia");
			throw error;
		}
	}

	/**
	 * Actualiza una familia
	 * @param {number} id - ID de la familia
	 * @param {Object} datosFamilia - Datos actualizados
	 * @returns {Promise<Object>} Familia actualizada
	 */
	async actualizarFamilia(id, datosFamilia) {
		try {
			// Validar que la familia exista
			const familiaExistente = await pool.query(
				"SELECT id_familia_producto FROM public.familia_producto WHERE id_familia_producto = $1",
				[id]
			);

			if (familiaExistente.rows.length === 0) {
				throw new Error("Familia no encontrada");
			}

			// Validar que el nombre no exista en otra familia
			if (datosFamilia.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_familia_producto FROM public.familia_producto WHERE nombre = $1 AND id_familia_producto != $2",
					[datosFamilia.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra familia con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.familia_producto SET nombre = $1 WHERE id_familia_producto = $2 RETURNING id_familia_producto, nombre",
				[datosFamilia.nombre, id]
			);

			logger.info({ familiaId: id }, "Familia actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar familia");
			throw error;
		}
	}

	/**
	 * Elimina una familia
	 * @param {number} id - ID de la familia
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarFamilia(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.familia_producto WHERE id_familia_producto = $1 RETURNING id_familia_producto",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Familia no encontrada");
			}

			logger.info({ familiaId: id }, "Familia eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar familia");
			throw error;
		}
	}

	/**
	 * Obtiene todas las medidas
	 * @returns {Promise<Array>} Lista de medidas
	 */
	async obtenerMedidas() {
		try {
			const result = await pool.query(
				"SELECT id_medida, nombre FROM public.medida ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Medidas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener medidas");
			throw error;
		}
	}

	/**
	 * Crea una nueva medida
	 * @param {Object} datosMedida - Datos de la medida
	 * @returns {Promise<Object>} Medida creada
	 */
	async crearMedida(datosMedida) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_medida FROM public.medida WHERE nombre = $1",
				[datosMedida.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una medida con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.medida (nombre) VALUES ($1) RETURNING id_medida, nombre",
				[datosMedida.nombre]
			);

			logger.info({ medidaId: result.rows[0].id_medida }, "Medida creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear medida");
			throw error;
		}
	}

	/**
	 * Actualiza una medida
	 * @param {number} id - ID de la medida
	 * @param {Object} datosMedida - Datos actualizados
	 * @returns {Promise<Object>} Medida actualizada
	 */
	async actualizarMedida(id, datosMedida) {
		try {
			// Validar que la medida exista
			const medidaExistente = await pool.query(
				"SELECT id_medida FROM public.medida WHERE id_medida = $1",
				[id]
			);

			if (medidaExistente.rows.length === 0) {
				throw new Error("Medida no encontrada");
			}

			// Validar que el nombre no exista en otra medida
			if (datosMedida.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_medida FROM public.medida WHERE nombre = $1 AND id_medida != $2",
					[datosMedida.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra medida con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.medida SET nombre = $1 WHERE id_medida = $2 RETURNING id_medida, nombre",
				[datosMedida.nombre, id]
			);

			logger.info({ medidaId: id }, "Medida actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar medida");
			throw error;
		}
	}

	/**
	 * Elimina una medida
	 * @param {number} id - ID de la medida
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarMedida(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.medida WHERE id_medida = $1 RETURNING id_medida",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Medida no encontrada");
			}

			logger.info({ medidaId: id }, "Medida eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar medida");
			throw error;
		}
	}

	/**
	 * Genera un PDF con códigos de barras de los productos seleccionados
	 * @param {Array<number>} idsProductos - IDs de los productos
	 * @returns {Promise<Buffer>} Buffer del PDF generado
	 */
	async generarPDFCodigosBarras(idsProductos) {
		try {
			if (!idsProductos || idsProductos.length === 0) {
				throw new Error("Debe seleccionar al menos un producto");
			}

			// Obtener los productos seleccionados
			const placeholders = idsProductos.map((_, index) => `$${index + 1}`).join(", ");
			const query = `
				SELECT 
					p.id_producto,
					p.nombre,
					p.codigo_barras
				FROM public.producto p
				WHERE p.id_producto IN (${placeholders})
					AND p.codigo_barras IS NOT NULL
					AND p.codigo_barras != ''
				ORDER BY p.nombre
			`;

			const result = await pool.query(query, idsProductos);
			const productos = result.rows;

			if (productos.length === 0) {
				throw new Error("No se encontraron productos con código de barras válido");
			}

			// Crear el PDF
			const doc = new PDFDocument({
				size: "A4",
				margin: 10,
			});

			const chunks = [];
			doc.on("data", (chunk) => chunks.push(chunk));

			const pageWidth = doc.page.width;
			const pageHeight = doc.page.height;
			const margin = 10;
			const labelWidth = 90; // Aumentado para dar más espacio
			const labelHeight = 50; // Aumentado para código de barras más grande
			const labelsPerRow = 2; // Reducido a 2 por fila para etiquetas más grandes
			const spacingX = (pageWidth - 2 * margin - labelsPerRow * labelWidth) / (labelsPerRow - 1);
			const spacingY = 5;

			let currentX = margin;
			let currentY = margin;
			let labelIndex = 0;

			// Generar etiquetas para cada producto
			for (const producto of productos) {
				try {
					// Generar código de barras como imagen PNG con tamaño más grande
					const png = await bwipjs.toBuffer({
						bcid: "code128",
						text: producto.codigo_barras,
						scale: 3, // Aumentado de 2 a 3
						height: 50, // Aumentado de 30 a 50
						width: 2, // Aumentado de 1.5 a 2
						includetext: true,
						textsize: 12, // Tamaño del texto del código
						textxalign: "center",
					});

					// Agregar borde a la etiqueta
					doc.rect(currentX, currentY, labelWidth, labelHeight).stroke();

					// Agregar nombre del producto (truncado si es muy largo)
					doc.fontSize(9); // Aumentado de 7 a 9
					doc.fillColor("black");
					const nombreTruncado = producto.nombre.length > 35 
						? producto.nombre.substring(0, 32) + "..." 
						: producto.nombre;
					doc.text(nombreTruncado, currentX + 3, currentY + 3, {
						width: labelWidth - 6,
						align: "left",
					});

					// Agregar código de barras (más grande)
					doc.image(png, currentX + 3, currentY + 12, {
						width: labelWidth - 6,
						height: 30, // Aumentado de 20 a 30
						fit: [labelWidth - 6, 30],
					});

					// Agregar código de barras como texto debajo (más grande)
					doc.fontSize(8); // Aumentado de 6 a 8
					doc.fillColor("gray");
					doc.text(producto.codigo_barras, currentX + labelWidth / 2, currentY + labelHeight - 5, {
						align: "center",
					});
					doc.fillColor("black");

					// Actualizar posición
					labelIndex++;
					if (labelIndex % labelsPerRow === 0) {
						currentX = margin;
						currentY += labelHeight + spacingY;
					} else {
						currentX += labelWidth + spacingX;
					}

					// Nueva página si es necesario
					if (currentY + labelHeight > pageHeight - margin) {
						doc.addPage();
						currentX = margin;
						currentY = margin;
					}
				} catch (barcodeError) {
					logger.warn({ err: barcodeError, productoId: producto.id_producto }, "Error al generar código de barras para producto");
					// Continuar con el siguiente producto
				}
			}

			// Finalizar el PDF
			doc.end();

			// Esperar a que el PDF se genere completamente
			return new Promise((resolve, reject) => {
				doc.on("end", () => {
					const pdfBuffer = Buffer.concat(chunks);
					logger.info({ productosCount: productos.length }, "PDF con códigos de barras generado exitosamente");
					resolve(pdfBuffer);
				});

				doc.on("error", (error) => {
					logger.error({ err: error }, "Error al generar PDF");
					reject(error);
				});
			});
		} catch (error) {
			logger.error({ err: error }, "Error al generar PDF de códigos de barras");
			throw error;
		}
	}
}

module.exports = new ConfiguracionProductosService();

