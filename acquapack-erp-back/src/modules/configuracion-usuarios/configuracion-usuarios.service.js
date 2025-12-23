const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones de configuración de usuarios
 */
class ConfiguracionUsuariosService {
	// ========== TIPO IDENTIFICACION ==========
	
	async obtenerTiposIdentificacion() {
		try {
			const result = await pool.query(
				"SELECT id_tipo_identificacion, nombre FROM public.tipo_identificacion ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Tipos de identificación obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de identificación");
			throw error;
		}
	}

	async crearTipoIdentificacion(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_tipo_identificacion FROM public.tipo_identificacion WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de identificación con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.tipo_identificacion (nombre) VALUES ($1) RETURNING id_tipo_identificacion, nombre",
				[datos.nombre]
			);

			logger.info({ tipoId: result.rows[0].id_tipo_identificacion }, "Tipo de identificación creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de identificación");
			throw error;
		}
	}

	async actualizarTipoIdentificacion(id, datos) {
		try {
			const tipoExistente = await pool.query(
				"SELECT id_tipo_identificacion FROM public.tipo_identificacion WHERE id_tipo_identificacion = $1",
				[id]
			);

			if (tipoExistente.rows.length === 0) {
				throw new Error("Tipo de identificación no encontrado");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_identificacion FROM public.tipo_identificacion WHERE nombre = $1 AND id_tipo_identificacion != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de identificación con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.tipo_identificacion SET nombre = $1 WHERE id_tipo_identificacion = $2 RETURNING id_tipo_identificacion, nombre",
				[datos.nombre, id]
			);

			logger.info({ tipoId: id }, "Tipo de identificación actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar tipo de identificación");
			throw error;
		}
	}

	async eliminarTipoIdentificacion(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_identificacion WHERE id_tipo_identificacion = $1 RETURNING id_tipo_identificacion",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de identificación no encontrado");
			}

			logger.info({ tipoId: id }, "Tipo de identificación eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar tipo de identificación");
			throw error;
		}
	}

	// ========== TIPO CONTRATO ==========

	async obtenerTiposContrato() {
		try {
			const result = await pool.query(
				"SELECT id_tipo_contrato, nombre FROM public.tipo_contrato ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Tipos de contrato obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de contrato");
			throw error;
		}
	}

	async crearTipoContrato(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_tipo_contrato FROM public.tipo_contrato WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de contrato con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.tipo_contrato (nombre) VALUES ($1) RETURNING id_tipo_contrato, nombre",
				[datos.nombre]
			);

			logger.info({ tipoId: result.rows[0].id_tipo_contrato }, "Tipo de contrato creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de contrato");
			throw error;
		}
	}

	async actualizarTipoContrato(id, datos) {
		try {
			const tipoExistente = await pool.query(
				"SELECT id_tipo_contrato FROM public.tipo_contrato WHERE id_tipo_contrato = $1",
				[id]
			);

			if (tipoExistente.rows.length === 0) {
				throw new Error("Tipo de contrato no encontrado");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_contrato FROM public.tipo_contrato WHERE nombre = $1 AND id_tipo_contrato != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de contrato con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.tipo_contrato SET nombre = $1 WHERE id_tipo_contrato = $2 RETURNING id_tipo_contrato, nombre",
				[datos.nombre, id]
			);

			logger.info({ tipoId: id }, "Tipo de contrato actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar tipo de contrato");
			throw error;
		}
	}

	async eliminarTipoContrato(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_contrato WHERE id_tipo_contrato = $1 RETURNING id_tipo_contrato",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de contrato no encontrado");
			}

			logger.info({ tipoId: id }, "Tipo de contrato eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar tipo de contrato");
			throw error;
		}
	}

	// ========== ESTADO CIVIL ==========

	async obtenerEstadosCiviles() {
		try {
			const result = await pool.query(
				"SELECT id_estado_civil, nombre FROM public.estado_civil ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Estados civiles obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener estados civiles");
			throw error;
		}
	}

	async crearEstadoCivil(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_estado_civil FROM public.estado_civil WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un estado civil con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.estado_civil (nombre) VALUES ($1) RETURNING id_estado_civil, nombre",
				[datos.nombre]
			);

			logger.info({ estadoId: result.rows[0].id_estado_civil }, "Estado civil creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear estado civil");
			throw error;
		}
	}

	async actualizarEstadoCivil(id, datos) {
		try {
			const estadoExistente = await pool.query(
				"SELECT id_estado_civil FROM public.estado_civil WHERE id_estado_civil = $1",
				[id]
			);

			if (estadoExistente.rows.length === 0) {
				throw new Error("Estado civil no encontrado");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_estado_civil FROM public.estado_civil WHERE nombre = $1 AND id_estado_civil != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro estado civil con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.estado_civil SET nombre = $1 WHERE id_estado_civil = $2 RETURNING id_estado_civil, nombre",
				[datos.nombre, id]
			);

			logger.info({ estadoId: id }, "Estado civil actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar estado civil");
			throw error;
		}
	}

	async eliminarEstadoCivil(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.estado_civil WHERE id_estado_civil = $1 RETURNING id_estado_civil",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Estado civil no encontrado");
			}

			logger.info({ estadoId: id }, "Estado civil eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar estado civil");
			throw error;
		}
	}

	// ========== ARL ==========

	async obtenerArls() {
		try {
			const result = await pool.query(
				"SELECT id_arl, nombre FROM public.arl ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "ARLs obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ARLs");
			throw error;
		}
	}

	async crearArl(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_arl FROM public.arl WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una ARL con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.arl (nombre) VALUES ($1) RETURNING id_arl, nombre",
				[datos.nombre]
			);

			logger.info({ arlId: result.rows[0].id_arl }, "ARL creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear ARL");
			throw error;
		}
	}

	async actualizarArl(id, datos) {
		try {
			const arlExistente = await pool.query(
				"SELECT id_arl FROM public.arl WHERE id_arl = $1",
				[id]
			);

			if (arlExistente.rows.length === 0) {
				throw new Error("ARL no encontrada");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_arl FROM public.arl WHERE nombre = $1 AND id_arl != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra ARL con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.arl SET nombre = $1 WHERE id_arl = $2 RETURNING id_arl, nombre",
				[datos.nombre, id]
			);

			logger.info({ arlId: id }, "ARL actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar ARL");
			throw error;
		}
	}

	async eliminarArl(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.arl WHERE id_arl = $1 RETURNING id_arl",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("ARL no encontrada");
			}

			logger.info({ arlId: id }, "ARL eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar ARL");
			throw error;
		}
	}

	// ========== EPS ==========

	async obtenerEpss() {
		try {
			const result = await pool.query(
				"SELECT id_eps, nombre FROM public.eps ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "EPSs obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener EPSs");
			throw error;
		}
	}

	async crearEps(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_eps FROM public.eps WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una EPS con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.eps (nombre) VALUES ($1) RETURNING id_eps, nombre",
				[datos.nombre]
			);

			logger.info({ epsId: result.rows[0].id_eps }, "EPS creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear EPS");
			throw error;
		}
	}

	async actualizarEps(id, datos) {
		try {
			const epsExistente = await pool.query(
				"SELECT id_eps FROM public.eps WHERE id_eps = $1",
				[id]
			);

			if (epsExistente.rows.length === 0) {
				throw new Error("EPS no encontrada");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_eps FROM public.eps WHERE nombre = $1 AND id_eps != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra EPS con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.eps SET nombre = $1 WHERE id_eps = $2 RETURNING id_eps, nombre",
				[datos.nombre, id]
			);

			logger.info({ epsId: id }, "EPS actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar EPS");
			throw error;
		}
	}

	async eliminarEps(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.eps WHERE id_eps = $1 RETURNING id_eps",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("EPS no encontrada");
			}

			logger.info({ epsId: id }, "EPS eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar EPS");
			throw error;
		}
	}

	// ========== CAJA COMPENSACION ==========

	async obtenerCajasCompensacion() {
		try {
			const result = await pool.query(
				"SELECT id_caja_compensacion, nombre FROM public.caja_compensacion ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Cajas de compensación obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener cajas de compensación");
			throw error;
		}
	}

	async crearCajaCompensacion(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_caja_compensacion FROM public.caja_compensacion WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una caja de compensación con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.caja_compensacion (nombre) VALUES ($1) RETURNING id_caja_compensacion, nombre",
				[datos.nombre]
			);

			logger.info({ cajaId: result.rows[0].id_caja_compensacion }, "Caja de compensación creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear caja de compensación");
			throw error;
		}
	}

	async actualizarCajaCompensacion(id, datos) {
		try {
			const cajaExistente = await pool.query(
				"SELECT id_caja_compensacion FROM public.caja_compensacion WHERE id_caja_compensacion = $1",
				[id]
			);

			if (cajaExistente.rows.length === 0) {
				throw new Error("Caja de compensación no encontrada");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_caja_compensacion FROM public.caja_compensacion WHERE nombre = $1 AND id_caja_compensacion != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra caja de compensación con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.caja_compensacion SET nombre = $1 WHERE id_caja_compensacion = $2 RETURNING id_caja_compensacion, nombre",
				[datos.nombre, id]
			);

			logger.info({ cajaId: id }, "Caja de compensación actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar caja de compensación");
			throw error;
		}
	}

	async eliminarCajaCompensacion(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.caja_compensacion WHERE id_caja_compensacion = $1 RETURNING id_caja_compensacion",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Caja de compensación no encontrada");
			}

			logger.info({ cajaId: id }, "Caja de compensación eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar caja de compensación");
			throw error;
		}
	}

	// ========== FONDO PENSIONES ==========

	async obtenerFondosPensiones() {
		try {
			const result = await pool.query(
				"SELECT id_fondo_pensiones, nombre FROM public.fondo_pensiones ORDER BY nombre"
			);
			logger.info({ count: result.rows.length }, "Fondos de pensiones obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener fondos de pensiones");
			throw error;
		}
	}

	async crearFondoPensiones(datos) {
		try {
			const nombreExistente = await pool.query(
				"SELECT id_fondo_pensiones FROM public.fondo_pensiones WHERE nombre = $1",
				[datos.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un fondo de pensiones con este nombre");
			}

			const result = await pool.query(
				"INSERT INTO public.fondo_pensiones (nombre) VALUES ($1) RETURNING id_fondo_pensiones, nombre",
				[datos.nombre]
			);

			logger.info({ fondoId: result.rows[0].id_fondo_pensiones }, "Fondo de pensiones creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear fondo de pensiones");
			throw error;
		}
	}

	async actualizarFondoPensiones(id, datos) {
		try {
			const fondoExistente = await pool.query(
				"SELECT id_fondo_pensiones FROM public.fondo_pensiones WHERE id_fondo_pensiones = $1",
				[id]
			);

			if (fondoExistente.rows.length === 0) {
				throw new Error("Fondo de pensiones no encontrado");
			}

			if (datos.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_fondo_pensiones FROM public.fondo_pensiones WHERE nombre = $1 AND id_fondo_pensiones != $2",
					[datos.nombre, id]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro fondo de pensiones con este nombre");
				}
			}

			const result = await pool.query(
				"UPDATE public.fondo_pensiones SET nombre = $1 WHERE id_fondo_pensiones = $2 RETURNING id_fondo_pensiones, nombre",
				[datos.nombre, id]
			);

			logger.info({ fondoId: id }, "Fondo de pensiones actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al actualizar fondo de pensiones");
			throw error;
		}
	}

	async eliminarFondoPensiones(id) {
		try {
			const result = await pool.query(
				"DELETE FROM public.fondo_pensiones WHERE id_fondo_pensiones = $1 RETURNING id_fondo_pensiones",
				[id]
			);

			if (result.rows.length === 0) {
				throw new Error("Fondo de pensiones no encontrado");
			}

			logger.info({ fondoId: id }, "Fondo de pensiones eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al eliminar fondo de pensiones");
			throw error;
		}
	}
}

module.exports = new ConfiguracionUsuariosService();

