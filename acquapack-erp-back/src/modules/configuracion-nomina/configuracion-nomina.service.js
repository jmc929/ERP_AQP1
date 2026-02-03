const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones de configuración de nómina
 */
class ConfiguracionNominaService {
	// ========== TIPO HORA ==========

	/**
	 * Obtiene todos los tipos de hora
	 * @returns {Promise<Array>} Lista de tipos de hora
	 */
	async obtenerTiposHora() {
		try {
			const result = await pool.query(`
				SELECT 
					th.id_tipo_hora,
					th.nombre,
					th.horario,
					th.recargo,
					th.valor_hora,
					th.id_estado,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.tipo_hora th
				LEFT JOIN public.estado e ON th.id_estado = e.id_estado
				ORDER BY th.id_tipo_hora
			`);
			logger.info({ count: result.rows.length }, "Tipos de hora obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de hora");
			throw error;
		}
	}

	/**
	 * Crea un nuevo tipo de hora
	 * @param {Object} datosTipoHora - Datos del tipo de hora
	 * @returns {Promise<Object>} Tipo de hora creado
	 */
	async crearTipoHora(datosTipoHora) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_tipo_hora FROM public.tipo_hora WHERE nombre = $1",
				[datosTipoHora.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de hora con este nombre");
			}

			const result = await pool.query(`
				INSERT INTO public.tipo_hora (nombre, horario, recargo, valor_hora, id_estado)
				VALUES ($1, $2, $3, $4, $5)
				RETURNING id_tipo_hora, nombre, horario, recargo, valor_hora, id_estado
			`, [
				datosTipoHora.nombre,
				datosTipoHora.horario || null,
				datosTipoHora.recargo || null,
				parseFloat(datosTipoHora.valor_hora) || 0,
				datosTipoHora.id_estado || 1
			]);

			logger.info({ tipoHoraId: result.rows[0].id_tipo_hora }, "Tipo de hora creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de hora");
			throw error;
		}
	}

	/**
	 * Actualiza un tipo de hora
	 * @param {number} idTipoHora - ID del tipo de hora
	 * @param {Object} datosTipoHora - Datos actualizados
	 * @returns {Promise<Object>} Tipo de hora actualizado
	 */
	async actualizarTipoHora(idTipoHora, datosTipoHora) {
		try {
			// Validar que existe
			const tipoHoraExistente = await pool.query(
				"SELECT id_tipo_hora FROM public.tipo_hora WHERE id_tipo_hora = $1",
				[idTipoHora]
			);

			if (tipoHoraExistente.rows.length === 0) {
				throw new Error("Tipo de hora no encontrado");
			}

			// Si se está cambiando el nombre, validar que no exista otro con ese nombre
			if (datosTipoHora.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_hora FROM public.tipo_hora WHERE nombre = $1 AND id_tipo_hora != $2",
					[datosTipoHora.nombre, idTipoHora]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de hora con este nombre");
				}
			}

			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosTipoHora.nombre !== undefined) {
				campos.push(`nombre = $${contador}`);
				valores.push(datosTipoHora.nombre);
				contador++;
			}

			if (datosTipoHora.horario !== undefined) {
				campos.push(`horario = $${contador}`);
				valores.push(datosTipoHora.horario);
				contador++;
			}

			if (datosTipoHora.recargo !== undefined) {
				campos.push(`recargo = $${contador}`);
				valores.push(datosTipoHora.recargo);
				contador++;
			}

			if (datosTipoHora.valor_hora !== undefined) {
				campos.push(`valor_hora = $${contador}`);
				valores.push(parseFloat(datosTipoHora.valor_hora) || 0);
				contador++;
			}

			if (datosTipoHora.id_estado !== undefined) {
				campos.push(`id_estado = $${contador}`);
				valores.push(parseInt(datosTipoHora.id_estado));
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idTipoHora);
			const query = `
				UPDATE public.tipo_hora 
				SET ${campos.join(", ")}
				WHERE id_tipo_hora = $${contador}
				RETURNING id_tipo_hora, nombre, horario, recargo, valor_hora, id_estado
			`;

			const result = await pool.query(query, valores);
			logger.info({ tipoHoraId: idTipoHora }, "Tipo de hora actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idTipoHora }, "Error al actualizar tipo de hora");
			throw error;
		}
	}

	/**
	 * Elimina un tipo de hora
	 * @param {number} idTipoHora - ID del tipo de hora
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarTipoHora(idTipoHora) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_hora WHERE id_tipo_hora = $1 RETURNING id_tipo_hora",
				[idTipoHora]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de hora no encontrado");
			}

			logger.info({ tipoHoraId: idTipoHora }, "Tipo de hora eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idTipoHora }, "Error al eliminar tipo de hora");
			throw error;
		}
	}

	// ========== TIPO DEDUCCION ==========

	/**
	 * Obtiene todos los tipos de deducción
	 * @returns {Promise<Array>} Lista de tipos de deducción
	 */
	async obtenerTiposDeduccion() {
		try {
			const result = await pool.query(`
				SELECT 
					td.id_tipo_deduccion,
					td.nombre,
					td.descripcion,
					td.id_estado,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.tipo_deduccion td
				LEFT JOIN public.estado e ON td.id_estado = e.id_estado
				ORDER BY td.nombre
			`);
			logger.info({ count: result.rows.length }, "Tipos de deducción obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de deducción");
			throw error;
		}
	}

	/**
	 * Crea un nuevo tipo de deducción
	 * @param {Object} datosTipoDeduccion - Datos del tipo de deducción
	 * @returns {Promise<Object>} Tipo de deducción creado
	 */
	async crearTipoDeduccion(datosTipoDeduccion) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_tipo_deduccion FROM public.tipo_deduccion WHERE nombre = $1",
				[datosTipoDeduccion.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de deducción con este nombre");
			}

			const result = await pool.query(`
				INSERT INTO public.tipo_deduccion (nombre, descripcion, id_estado)
				VALUES ($1, $2, $3)
				RETURNING id_tipo_deduccion, nombre, descripcion, id_estado
			`, [
				datosTipoDeduccion.nombre,
				datosTipoDeduccion.descripcion || null,
				datosTipoDeduccion.id_estado || 1
			]);

			logger.info({ tipoDeduccionId: result.rows[0].id_tipo_deduccion }, "Tipo de deducción creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de deducción");
			throw error;
		}
	}

	/**
	 * Actualiza un tipo de deducción
	 * @param {number} idTipoDeduccion - ID del tipo de deducción
	 * @param {Object} datosTipoDeduccion - Datos actualizados
	 * @returns {Promise<Object>} Tipo de deducción actualizado
	 */
	async actualizarTipoDeduccion(idTipoDeduccion, datosTipoDeduccion) {
		try {
			// Validar que existe
			const tipoDeduccionExistente = await pool.query(
				"SELECT id_tipo_deduccion FROM public.tipo_deduccion WHERE id_tipo_deduccion = $1",
				[idTipoDeduccion]
			);

			if (tipoDeduccionExistente.rows.length === 0) {
				throw new Error("Tipo de deducción no encontrado");
			}

			// Si se está cambiando el nombre, validar que no exista otro con ese nombre
			if (datosTipoDeduccion.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_deduccion FROM public.tipo_deduccion WHERE nombre = $1 AND id_tipo_deduccion != $2",
					[datosTipoDeduccion.nombre, idTipoDeduccion]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de deducción con este nombre");
				}
			}

			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosTipoDeduccion.nombre !== undefined) {
				campos.push(`nombre = $${contador}`);
				valores.push(datosTipoDeduccion.nombre);
				contador++;
			}

			if (datosTipoDeduccion.descripcion !== undefined) {
				campos.push(`descripcion = $${contador}`);
				valores.push(datosTipoDeduccion.descripcion);
				contador++;
			}

			if (datosTipoDeduccion.id_estado !== undefined) {
				campos.push(`id_estado = $${contador}`);
				valores.push(parseInt(datosTipoDeduccion.id_estado));
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idTipoDeduccion);
			const query = `
				UPDATE public.tipo_deduccion 
				SET ${campos.join(", ")}
				WHERE id_tipo_deduccion = $${contador}
				RETURNING id_tipo_deduccion, nombre, descripcion, id_estado
			`;

			const result = await pool.query(query, valores);
			logger.info({ tipoDeduccionId: idTipoDeduccion }, "Tipo de deducción actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idTipoDeduccion }, "Error al actualizar tipo de deducción");
			throw error;
		}
	}

	/**
	 * Elimina un tipo de deducción
	 * @param {number} idTipoDeduccion - ID del tipo de deducción
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarTipoDeduccion(idTipoDeduccion) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_deduccion WHERE id_tipo_deduccion = $1 RETURNING id_tipo_deduccion",
				[idTipoDeduccion]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de deducción no encontrado");
			}

			logger.info({ tipoDeduccionId: idTipoDeduccion }, "Tipo de deducción eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idTipoDeduccion }, "Error al eliminar tipo de deducción");
			throw error;
		}
	}
}

module.exports = new ConfiguracionNominaService();

