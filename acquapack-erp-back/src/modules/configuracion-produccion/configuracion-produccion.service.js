const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones de configuración de producción
 */
class ConfiguracionProduccionService {
	// ========== TIPO MAQUINA ==========

	/**
	 * Obtiene todos los tipos de máquina
	 * @returns {Promise<Array>} Lista de tipos de máquina
	 */
	async obtenerTiposMaquina() {
		try {
			const result = await pool.query(`
				SELECT 
					tm.id_tipo_maquina,
					tm.nombre,
					tm.descripcion
				FROM public.tipo_maquina tm
				ORDER BY tm.id_tipo_maquina
			`);
			logger.info({ count: result.rows.length }, "Tipos de máquina obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tipos de máquina");
			throw error;
		}
	}

	/**
	 * Crea un nuevo tipo de máquina
	 * @param {Object} datosTipoMaquina - Datos del tipo de máquina
	 * @returns {Promise<Object>} Tipo de máquina creado
	 */
	async crearTipoMaquina(datosTipoMaquina) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_tipo_maquina FROM public.tipo_maquina WHERE nombre = $1",
				[datosTipoMaquina.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe un tipo de máquina con este nombre");
			}

			const result = await pool.query(`
				INSERT INTO public.tipo_maquina (nombre, descripcion)
				VALUES ($1, $2)
				RETURNING id_tipo_maquina, nombre, descripcion
			`, [
				datosTipoMaquina.nombre,
				datosTipoMaquina.descripcion || null
			]);

			logger.info({ tipoMaquinaId: result.rows[0].id_tipo_maquina }, "Tipo de máquina creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tipo de máquina");
			throw error;
		}
	}

	/**
	 * Actualiza un tipo de máquina
	 * @param {number} idTipoMaquina - ID del tipo de máquina
	 * @param {Object} datosTipoMaquina - Datos actualizados
	 * @returns {Promise<Object>} Tipo de máquina actualizado
	 */
	async actualizarTipoMaquina(idTipoMaquina, datosTipoMaquina) {
		try {
			// Validar que existe
			const tipoMaquinaExistente = await pool.query(
				"SELECT id_tipo_maquina FROM public.tipo_maquina WHERE id_tipo_maquina = $1",
				[idTipoMaquina]
			);

			if (tipoMaquinaExistente.rows.length === 0) {
				throw new Error("Tipo de máquina no encontrado");
			}

			// Si se está cambiando el nombre, validar que no exista otro con ese nombre
			if (datosTipoMaquina.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_tipo_maquina FROM public.tipo_maquina WHERE nombre = $1 AND id_tipo_maquina != $2",
					[datosTipoMaquina.nombre, idTipoMaquina]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otro tipo de máquina con este nombre");
				}
			}

			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosTipoMaquina.nombre !== undefined) {
				campos.push(`nombre = $${contador}`);
				valores.push(datosTipoMaquina.nombre);
				contador++;
			}

			if (datosTipoMaquina.descripcion !== undefined) {
				campos.push(`descripcion = $${contador}`);
				valores.push(datosTipoMaquina.descripcion || null);
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idTipoMaquina);
			const query = `
				UPDATE public.tipo_maquina 
				SET ${campos.join(", ")}
				WHERE id_tipo_maquina = $${contador}
				RETURNING id_tipo_maquina, nombre, descripcion
			`;

			const result = await pool.query(query, valores);
			logger.info({ tipoMaquinaId: idTipoMaquina }, "Tipo de máquina actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idTipoMaquina }, "Error al actualizar tipo de máquina");
			throw error;
		}
	}

	/**
	 * Elimina un tipo de máquina
	 * @param {number} idTipoMaquina - ID del tipo de máquina
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarTipoMaquina(idTipoMaquina) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tipo_maquina WHERE id_tipo_maquina = $1 RETURNING id_tipo_maquina",
				[idTipoMaquina]
			);

			if (result.rows.length === 0) {
				throw new Error("Tipo de máquina no encontrado");
			}

			logger.info({ tipoMaquinaId: idTipoMaquina }, "Tipo de máquina eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idTipoMaquina }, "Error al eliminar tipo de máquina");
			throw error;
		}
	}

	// ========== MAQUINAS ==========

	/**
	 * Obtiene todas las máquinas
	 * @returns {Promise<Array>} Lista de máquinas
	 */
	async obtenerMaquinas() {
		try {
			const result = await pool.query(`
				SELECT 
					m.id_maquina,
					m.id_tipo_maquina,
					m.nombre,
					m.observaciones,
					tm.nombre as tipo_maquina_nombre
				FROM public.maquinas m
				LEFT JOIN public.tipo_maquina tm ON m.id_tipo_maquina = tm.id_tipo_maquina
				ORDER BY m.id_maquina
			`);
			logger.info({ count: result.rows.length }, "Máquinas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener máquinas");
			throw error;
		}
	}

	/**
	 * Crea una nueva máquina
	 * @param {Object} datosMaquina - Datos de la máquina
	 * @returns {Promise<Object>} Máquina creada
	 */
	async crearMaquina(datosMaquina) {
		try {
			// Validar que el nombre no exista
			const nombreExistente = await pool.query(
				"SELECT id_maquina FROM public.maquinas WHERE nombre = $1",
				[datosMaquina.nombre]
			);

			if (nombreExistente.rows.length > 0) {
				throw new Error("Ya existe una máquina con este nombre");
			}

			// Validar que el tipo de máquina existe
			if (datosMaquina.id_tipo_maquina) {
				const tipoMaquinaExistente = await pool.query(
					"SELECT id_tipo_maquina FROM public.tipo_maquina WHERE id_tipo_maquina = $1",
					[datosMaquina.id_tipo_maquina]
				);

				if (tipoMaquinaExistente.rows.length === 0) {
					throw new Error("El tipo de máquina seleccionado no existe");
				}
			}

			const result = await pool.query(`
				INSERT INTO public.maquinas (id_tipo_maquina, nombre, observaciones)
				VALUES ($1, $2, $3)
				RETURNING id_maquina, id_tipo_maquina, nombre, observaciones
			`, [
				datosMaquina.id_tipo_maquina || null,
				datosMaquina.nombre,
				datosMaquina.observaciones || null
			]);

			logger.info({ maquinaId: result.rows[0].id_maquina }, "Máquina creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear máquina");
			throw error;
		}
	}

	/**
	 * Actualiza una máquina
	 * @param {number} idMaquina - ID de la máquina
	 * @param {Object} datosMaquina - Datos actualizados
	 * @returns {Promise<Object>} Máquina actualizada
	 */
	async actualizarMaquina(idMaquina, datosMaquina) {
		try {
			// Validar que existe
			const maquinaExistente = await pool.query(
				"SELECT id_maquina FROM public.maquinas WHERE id_maquina = $1",
				[idMaquina]
			);

			if (maquinaExistente.rows.length === 0) {
				throw new Error("Máquina no encontrada");
			}

			// Si se está cambiando el nombre, validar que no exista otra con ese nombre
			if (datosMaquina.nombre) {
				const nombreExistente = await pool.query(
					"SELECT id_maquina FROM public.maquinas WHERE nombre = $1 AND id_maquina != $2",
					[datosMaquina.nombre, idMaquina]
				);

				if (nombreExistente.rows.length > 0) {
					throw new Error("Ya existe otra máquina con este nombre");
				}
			}

			// Validar que el tipo de máquina existe si se está cambiando
			if (datosMaquina.id_tipo_maquina !== undefined && datosMaquina.id_tipo_maquina !== null) {
				const tipoMaquinaExistente = await pool.query(
					"SELECT id_tipo_maquina FROM public.tipo_maquina WHERE id_tipo_maquina = $1",
					[datosMaquina.id_tipo_maquina]
				);

				if (tipoMaquinaExistente.rows.length === 0) {
					throw new Error("El tipo de máquina seleccionado no existe");
				}
			}

			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosMaquina.id_tipo_maquina !== undefined) {
				campos.push(`id_tipo_maquina = $${contador}`);
				valores.push(datosMaquina.id_tipo_maquina || null);
				contador++;
			}

			if (datosMaquina.nombre !== undefined) {
				campos.push(`nombre = $${contador}`);
				valores.push(datosMaquina.nombre);
				contador++;
			}

			if (datosMaquina.observaciones !== undefined) {
				campos.push(`observaciones = $${contador}`);
				valores.push(datosMaquina.observaciones || null);
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idMaquina);
			const query = `
				UPDATE public.maquinas 
				SET ${campos.join(", ")}
				WHERE id_maquina = $${contador}
				RETURNING id_maquina, id_tipo_maquina, nombre, observaciones
			`;

			const result = await pool.query(query, valores);
			logger.info({ maquinaId: idMaquina }, "Máquina actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idMaquina }, "Error al actualizar máquina");
			throw error;
		}
	}

	/**
	 * Elimina una máquina
	 * @param {number} idMaquina - ID de la máquina
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarMaquina(idMaquina) {
		try {
			const result = await pool.query(
				"DELETE FROM public.maquinas WHERE id_maquina = $1 RETURNING id_maquina",
				[idMaquina]
			);

			if (result.rows.length === 0) {
				throw new Error("Máquina no encontrada");
			}

			logger.info({ maquinaId: idMaquina }, "Máquina eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idMaquina }, "Error al eliminar máquina");
			throw error;
		}
	}
}

module.exports = new ConfiguracionProduccionService();

