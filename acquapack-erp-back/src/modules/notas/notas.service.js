const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con notas
 */
class NotasService {
	/**
	 * Obtiene todas las notas de un usuario
	 * @param {number} idUsuario - ID del usuario
	 * @returns {Promise<Array>} Lista de notas del usuario
	 */
	async obtenerNotasPorUsuario(idUsuario) {
		try {
			const query = `
				SELECT 
					n.id_notas,
					n.titulo,
					n.nota,
					n.id_usuario,
					n.id_usuario_creador,
					n.fecha_creacion,
					n.fecha_actualizacion,
					u.nombre || ' ' || u.apellido as nombre_usuario,
					uc.nombre || ' ' || uc.apellido as nombre_usuario_creador
				FROM public.notas n
				LEFT JOIN public.usuarios u ON n.id_usuario = u.id_usuarios
				LEFT JOIN public.usuarios uc ON n.id_usuario_creador = uc.id_usuarios
				WHERE n.id_usuario = $1
				ORDER BY n.fecha_actualizacion DESC, n.id_notas DESC
			`;

			const result = await pool.query(query, [idUsuario]);
			
			logger.info({ idUsuario, count: result.rows.length }, "Notas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error, idUsuario }, "Error al obtener notas");
			throw error;
		}
	}

	/**
	 * Obtiene todas las notas (para administradores)
	 * @returns {Promise<Array>} Lista de todas las notas
	 */
	async obtenerTodasLasNotas() {
		try {
			const query = `
				SELECT 
					n.id_notas,
					n.titulo,
					n.nota,
					n.id_usuario,
					n.id_usuario_creador,
					n.fecha_creacion,
					n.fecha_actualizacion,
					u.nombre || ' ' || u.apellido as nombre_usuario,
					uc.nombre || ' ' || uc.apellido as nombre_usuario_creador
				FROM public.notas n
				LEFT JOIN public.usuarios u ON n.id_usuario = u.id_usuarios
				LEFT JOIN public.usuarios uc ON n.id_usuario_creador = uc.id_usuarios
				ORDER BY n.fecha_actualizacion DESC, n.id_notas DESC
			`;

			const result = await pool.query(query);
			
			logger.info({ count: result.rows.length }, "Todas las notas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener todas las notas");
			throw error;
		}
	}

	/**
	 * Obtiene una nota por su ID
	 * @param {number} idNota - ID de la nota
	 * @returns {Promise<Object>} Nota encontrada
	 */
	async obtenerNotaPorId(idNota) {
		try {
			const query = `
				SELECT 
					n.id_notas,
					n.titulo,
					n.nota,
					n.id_usuario,
					n.id_usuario_creador,
					n.fecha_creacion,
					n.fecha_actualizacion,
					u.nombre || ' ' || u.apellido as nombre_usuario,
					uc.nombre || ' ' || uc.apellido as nombre_usuario_creador
				FROM public.notas n
				LEFT JOIN public.usuarios u ON n.id_usuario = u.id_usuarios
				LEFT JOIN public.usuarios uc ON n.id_usuario_creador = uc.id_usuarios
				WHERE n.id_notas = $1
			`;

			const result = await pool.query(query, [idNota]);
			
			if (result.rows.length === 0) {
				throw new Error("Nota no encontrada");
			}

			logger.info({ idNota }, "Nota obtenida exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idNota }, "Error al obtener nota");
			throw error;
		}
	}

	/**
	 * Crea una nueva nota
	 * @param {Object} datosNota - Datos de la nota
	 * @returns {Promise<Object>} Nota creada
	 */
	async crearNota(datosNota) {
		try {
			// Obtener el siguiente ID
			const idResult = await pool.query(
				"SELECT COALESCE(MAX(id_notas), 0) + 1 as next_id FROM public.notas"
			);
			const nextId = idResult.rows[0].next_id;

			const query = `
				INSERT INTO public.notas (
					id_notas,
					titulo,
					nota,
					id_usuario,
					id_usuario_creador
				) VALUES ($1, $2, $3, $4, $5)
				RETURNING id_notas, titulo, nota, id_usuario, id_usuario_creador, fecha_creacion, fecha_actualizacion
			`;

			const result = await pool.query(query, [
				nextId,
				datosNota.titulo,
				datosNota.nota,
				datosNota.id_usuario,
				datosNota.id_usuario_creador
			]);

			logger.info({ notaId: result.rows[0].id_notas }, "Nota creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear nota");
			throw error;
		}
	}

	/**
	 * Actualiza una nota
	 * @param {number} idNota - ID de la nota
	 * @param {Object} datosNota - Datos actualizados
	 * @returns {Promise<Object>} Nota actualizada
	 */
	async actualizarNota(idNota, datosNota) {
		try {
			// Validar que la nota exista
			const notaExistente = await pool.query(
				"SELECT id_notas FROM public.notas WHERE id_notas = $1",
				[idNota]
			);

			if (notaExistente.rows.length === 0) {
				throw new Error("Nota no encontrada");
			}

			const query = `
				UPDATE public.notas 
				SET 
					titulo = $1,
					nota = $2,
					fecha_actualizacion = NOW()
				WHERE id_notas = $3
				RETURNING id_notas, titulo, nota, id_usuario, fecha_creacion, fecha_actualizacion
			`;

			const result = await pool.query(query, [
				datosNota.titulo,
				datosNota.nota,
				idNota
			]);

			logger.info({ notaId: idNota }, "Nota actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idNota }, "Error al actualizar nota");
			throw error;
		}
	}

	/**
	 * Elimina una nota
	 * @param {number} idNota - ID de la nota
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarNota(idNota) {
		try {
			const result = await pool.query(
				"DELETE FROM public.notas WHERE id_notas = $1 RETURNING id_notas",
				[idNota]
			);

			if (result.rows.length === 0) {
				throw new Error("Nota no encontrada");
			}

			logger.info({ notaId: idNota }, "Nota eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idNota }, "Error al eliminar nota");
			throw error;
		}
	}
}

module.exports = new NotasService();

