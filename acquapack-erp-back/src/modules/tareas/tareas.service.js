const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con tareas
 */
class TareasService {
	/**
	 * Obtiene todas las tareas con información del usuario
	 * @returns {Promise<Array>} Lista de tareas con información del usuario
	 */
	async obtenerTareas() {
		try {
			const query = `
				SELECT 
					t.id_tareas,
					t.id_usuarios,
					t.descripcion,
					t.completada,
					t.fecha_asignacion,
					u.nombre || ' ' || u.apellido as nombre_usuario
				FROM public.tareas t
				LEFT JOIN public.usuarios u ON t.id_usuarios = u.id_usuarios
				ORDER BY t.fecha_asignacion DESC, t.id_tareas DESC
			`;

			const result = await pool.query(query);
			logger.info({ count: result.rows.length }, "Tareas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener tareas");
			throw error;
		}
	}

	/**
	 * Obtiene todas las tareas de un usuario específico
	 * @param {number} idUsuario - ID del usuario
	 * @returns {Promise<Array>} Lista de tareas del usuario
	 */
	async obtenerTareasPorUsuario(idUsuario) {
		try {
			const query = `
				SELECT 
					t.id_tareas,
					t.id_usuarios,
					t.descripcion,
					t.completada,
					t.fecha_asignacion
				FROM public.tareas t
				WHERE t.id_usuarios = $1
				ORDER BY t.completada ASC, t.fecha_asignacion DESC, t.id_tareas DESC
			`;

			const result = await pool.query(query, [idUsuario]);
			logger.info({ idUsuario, count: result.rows.length }, "Tareas del usuario obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error, idUsuario }, "Error al obtener tareas del usuario");
			throw error;
		}
	}

	/**
	 * Crea una nueva tarea
	 * @param {Object} datosTarea - Datos de la tarea
	 * @returns {Promise<Object>} Tarea creada
	 */
	async crearTarea(datosTarea) {
		try {
			// Obtener el siguiente ID
			const idResult = await pool.query(
				"SELECT COALESCE(MAX(id_tareas), 0) + 1 as next_id FROM public.tareas"
			);
			const nextId = idResult.rows[0].next_id;

			const query = `
				INSERT INTO public.tareas (
					id_tareas,
					id_usuarios,
					descripcion,
					completada,
					fecha_asignacion
				) VALUES ($1, $2, $3, $4, $5)
				RETURNING id_tareas, id_usuarios, descripcion, completada, fecha_asignacion
			`;

			const valores = [
				nextId,
				datosTarea.id_usuarios,
				datosTarea.descripcion,
				datosTarea.completada || false,
				datosTarea.fecha_asignacion || new Date().toISOString().split('T')[0]
			];

			const result = await pool.query(query, valores);
			logger.info({ tareaId: result.rows[0].id_tareas }, "Tarea creada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear tarea");
			throw error;
		}
	}

	/**
	 * Actualiza una tarea
	 * @param {number} idTarea - ID de la tarea
	 * @param {Object} datosTarea - Datos actualizados
	 * @returns {Promise<Object>} Tarea actualizada
	 */
	async actualizarTarea(idTarea, datosTarea) {
		try {
			// Validar que la tarea exista
			const tareaExistente = await pool.query(
				"SELECT id_tareas FROM public.tareas WHERE id_tareas = $1",
				[idTarea]
			);

			if (tareaExistente.rows.length === 0) {
				throw new Error("Tarea no encontrada");
			}

			// Construir la query de actualización dinámicamente
			const campos = [];
			const valores = [];
			let contador = 1;

			if (datosTarea.descripcion !== undefined) {
				campos.push(`descripcion = $${contador}`);
				valores.push(datosTarea.descripcion);
				contador++;
			}

			if (datosTarea.completada !== undefined) {
				campos.push(`completada = $${contador}`);
				valores.push(datosTarea.completada);
				contador++;
			}

			if (datosTarea.fecha_asignacion !== undefined) {
				campos.push(`fecha_asignacion = $${contador}`);
				valores.push(datosTarea.fecha_asignacion);
				contador++;
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idTarea);
			const query = `
				UPDATE public.tareas 
				SET ${campos.join(", ")}
				WHERE id_tareas = $${contador}
				RETURNING id_tareas, id_usuarios, descripcion, completada, fecha_asignacion
			`;

			const result = await pool.query(query, valores);
			logger.info({ tareaId: idTarea }, "Tarea actualizada exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idTarea }, "Error al actualizar tarea");
			throw error;
		}
	}

	/**
	 * Elimina una tarea
	 * @param {number} idTarea - ID de la tarea
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarTarea(idTarea) {
		try {
			const result = await pool.query(
				"DELETE FROM public.tareas WHERE id_tareas = $1 RETURNING id_tareas",
				[idTarea]
			);

			if (result.rows.length === 0) {
				throw new Error("Tarea no encontrada");
			}

			logger.info({ tareaId: idTarea }, "Tarea eliminada exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idTarea }, "Error al eliminar tarea");
			throw error;
		}
	}
}

module.exports = new TareasService();

