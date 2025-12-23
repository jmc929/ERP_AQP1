const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones de configuración de clientes
 */
class ConfiguracionClientesService {
	// ========== TIPO ENTIDAD ==========
	
	async obtenerTiposEntidad() {
		try {
			const result = await pool.query(
				"SELECT id_tipo_entidad, nombre FROM public.tipo_entidad ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Tipos de entidad obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de entidad");
			throw error;
		}
	}

	async crearTipoEntidad(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_tipo_entidad FROM public.tipo_entidad WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de entidad con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.tipo_entidad (nombre) VALUES ($1) RETURNING id_tipo_entidad, nombre",
				[datos.nombre]
			);

			logger.info({ tipoId: result.rows[0].id_tipo_entidad }, "Tipo de entidad creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de entidad");
			throw error;
		}
	}

	async actualizarTipoEntidad(id, datos) {
		try {
			const tipoExistente = await pool.query(
				"SELECT id_tipo_entidad FROM public.tipo_entidad WHERE id_tipo_entidad = $1",
				[id]
			);

			if (tipoExistente.rows.length === 0) {
				throw new Error("Tipo de entidad no encontrado");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_entidad FROM public.tipo_entidad WHERE nombre = $1 AND id_tipo_entidad != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de entidad con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.tipo_entidad SET nombre = $1 WHERE id_tipo_entidad = $2 RETURNING id_tipo_entidad, nombre",
				[datos.nombre, id]
			);

			logger.info({ tipoId: id }, "Tipo de entidad actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar tipo de entidad");
			throw error;
		}
	}

	async eliminarTipoEntidad(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_entidad WHERE id_tipo_entidad = $1 RETURNING id_tipo_entidad",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de entidad no encontrado");
			}

			logger.info({ tipoId: id }, "Tipo de entidad eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar tipo de entidad");
			throw error;
		}
	}

	// ========== CIUDAD ==========

	async obtenerCiudades(page = 1, limit = 30) {
		try {
			const offset = (page - 1) * limit;
			
			// Obtener el total de ciudades
			const countResult = await pool.query("SELECT COUNT(*) as total FROM public.ciudad");
			const total = parseInt(countResult.rows[0].total);
			
			// Obtener las ciudades paginadas
			const result = await pool.query(
				"SELECT id_ciudad, nombre FROM public.ciudad ORDER BY nombre LIMIT $1 OFFSET $2",
				[limit, offset]
			);
			
			const totalPaginas = Math.ceil(total / limit);
			
			logger.info({ count: result.rows.length, page, totalPaginas, total }, "Ciudades obtenidas exitosamente");
			return {
				ciudades: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros: total,
					limite: limit
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ciudades");
			throw error;
		}
	}

	async crearCiudad(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_ciudad FROM public.ciudad WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una ciudad con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.ciudad (nombre) VALUES ($1) RETURNING id_ciudad, nombre",
				[datos.nombre]
			);

			logger.info({ ciudadId: result.rows[0].id_ciudad }, "Ciudad creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear ciudad");
			throw error;
		}
	}

	async actualizarCiudad(id, datos) {
		try {
			const ciudadExistente = await pool.query(
				"SELECT id_ciudad FROM public.ciudad WHERE id_ciudad = $1",
				[id]
			);

			if (ciudadExistente.rows.length === 0) {
				throw new Error("Ciudad no encontrada");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_ciudad FROM public.ciudad WHERE nombre = $1 AND id_ciudad != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra ciudad con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.ciudad SET nombre = $1 WHERE id_ciudad = $2 RETURNING id_ciudad, nombre",
				[datos.nombre, id]
			);

			logger.info({ ciudadId: id }, "Ciudad actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar ciudad");
			throw error;
		}
	}

	async eliminarCiudad(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.ciudad WHERE id_ciudad = $1 RETURNING id_ciudad",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Ciudad no encontrada");
			}

			logger.info({ ciudadId: id }, "Ciudad eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar ciudad");
			throw error;
		}
	}

	// ========== TIPO REGIMEN IVA ==========

	async obtenerTiposRegimenIva() {
		try {
			const result = await pool.query(
				"SELECT id_regimen_iva, nombre FROM public.tipo_regimen_iva ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Tipos de régimen IVA obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de régimen IVA");
			throw error;
		}
	}

	async crearTipoRegimenIva(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_regimen_iva FROM public.tipo_regimen_iva WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de régimen IVA con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.tipo_regimen_iva (nombre) VALUES ($1) RETURNING id_regimen_iva, nombre",
				[datos.nombre]
			);

			logger.info({ regimenId: result.rows[0].id_regimen_iva }, "Tipo de régimen IVA creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de régimen IVA");
			throw error;
		}
	}

	async actualizarTipoRegimenIva(id, datos) {
		try {
			const regimenExistente = await pool.query(
				"SELECT id_regimen_iva FROM public.tipo_regimen_iva WHERE id_regimen_iva = $1",
				[id]
			);

			if (regimenExistente.rows.length === 0) {
				throw new Error("Tipo de régimen IVA no encontrado");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_regimen_iva FROM public.tipo_regimen_iva WHERE nombre = $1 AND id_regimen_iva != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de régimen IVA con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.tipo_regimen_iva SET nombre = $1 WHERE id_regimen_iva = $2 RETURNING id_regimen_iva, nombre",
				[datos.nombre, id]
			);

			logger.info({ regimenId: id }, "Tipo de régimen IVA actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar tipo de régimen IVA");
			throw error;
		}
	}

	async eliminarTipoRegimenIva(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_regimen_iva WHERE id_regimen_iva = $1 RETURNING id_regimen_iva",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de régimen IVA no encontrado");
			}

			logger.info({ regimenId: id }, "Tipo de régimen IVA eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar tipo de régimen IVA");
			throw error;
		}
	}

	// ========== RESPONSABILIDAD FISCAL ==========

	async obtenerResponsabilidadesFiscales() {
		try {
			const result = await pool.query(
				"SELECT id_responsabilidad_fiscal, nombre, codigo FROM public.responsabilidad_fiscal ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Responsabilidades fiscales obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener responsabilidades fiscales");
			throw error;
		}
	}

	async crearResponsabilidadFiscal(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_responsabilidad_fiscal FROM public.responsabilidad_fiscal WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una responsabilidad fiscal con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.responsabilidad_fiscal (nombre, codigo) VALUES ($1, $2) RETURNING id_responsabilidad_fiscal, nombre, codigo",
				[datos.nombre, datos.codigo || null]
			);

			logger.info({ responsabilidadId: result.rows[0].id_responsabilidad_fiscal }, "Responsabilidad fiscal creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear responsabilidad fiscal");
			throw error;
		}
	}

	async actualizarResponsabilidadFiscal(id, datos) {
		try {
			const responsabilidadExistente = await pool.query(
				"SELECT id_responsabilidad_fiscal FROM public.responsabilidad_fiscal WHERE id_responsabilidad_fiscal = $1",
				[id]
			);

			if (responsabilidadExistente.rows.length === 0) {
				throw new Error("Responsabilidad fiscal no encontrada");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_responsabilidad_fiscal FROM public.responsabilidad_fiscal WHERE nombre = $1 AND id_responsabilidad_fiscal != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra responsabilidad fiscal con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.responsabilidad_fiscal SET nombre = $1, codigo = $2 WHERE id_responsabilidad_fiscal = $3 RETURNING id_responsabilidad_fiscal, nombre, codigo",
				[datos.nombre, datos.codigo || null, id]
			);

			logger.info({ responsabilidadId: id }, "Responsabilidad fiscal actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar responsabilidad fiscal");
			throw error;
		}
	}

	async eliminarResponsabilidadFiscal(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.responsabilidad_fiscal WHERE id_responsabilidad_fiscal = $1 RETURNING id_responsabilidad_fiscal",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Responsabilidad fiscal no encontrada");
			}

			logger.info({ responsabilidadId: id }, "Responsabilidad fiscal eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar responsabilidad fiscal");
			throw error;
		}
	}
}

module.exports = new ConfiguracionClientesService();

