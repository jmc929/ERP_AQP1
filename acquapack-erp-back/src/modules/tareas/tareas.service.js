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
			// Query simple primero - manejar caso cuando la tabla está vacía
			const query = `
				SELECT 
					t.id_tareas,
					t.id_usuarios,
					t.descripcion,
					t.id_estado,
					t.fecha_asignacion
				FROM public.tareas t
				ORDER BY t.fecha_asignacion DESC, t.id_tareas DESC
			`;

			let result;
			try {
				result = await pool.query(query);
			} catch (queryError) {
				logger.error({ err: queryError }, "Error en query de tareas");
				// Si hay un error, devolver array vacío
				return [];
			}
			
			// Si no hay resultados, devolver array vacío
			if (!result || !result.rows) {
				return [];
			}
			
			// Obtener usuarios
			const usuariosMap = {};
			try {
				const usuariosQuery = await pool.query(`
					SELECT id_usuarios, nombre, apellido 
					FROM public.usuarios
				`);
				usuariosQuery.rows.forEach(usuario => {
					usuariosMap[usuario.id_usuarios] = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || 'Usuario desconocido';
				});
			} catch (usuariosError) {
				logger.warn({ err: usuariosError }, "No se pudieron obtener usuarios");
			}
			
			// Obtener información de estados
			let estadosMap = {};
			try {
				const estadosQuery = await pool.query(`
					SELECT id_estado, nombre, color 
					FROM public.estado 
					WHERE id_estado IN (21, 22, 23)
				`);
				
				estadosQuery.rows.forEach(estado => {
					estadosMap[estado.id_estado] = {
						nombre: estado.nombre,
						color: estado.color
					};
				});
			} catch (estadosError) {
				logger.warn({ err: estadosError }, "No se pudieron obtener estados, usando valores por defecto");
			}
			
			// Valores por defecto si no se encontraron estados
			const estadosDefault = {
				21: { nombre: 'Pendiente', color: '#94a3b8' },
				22: { nombre: 'En proceso', color: '#3b82f6' },
				23: { nombre: 'Terminado', color: '#10b981' }
			};
			
			// Mapear tareas con información de estado
			const tareasConEstado = result.rows.map(tarea => {
				const idEstado = tarea.id_estado ?? 21;
				const estadoInfo = estadosMap[idEstado] || estadosDefault[idEstado] || estadosDefault[21];
				const nombreUsuario = usuariosMap[tarea.id_usuarios] || 'Usuario desconocido';
				
				return {
					...tarea,
					id_estado: idEstado,
					estado_nombre: estadoInfo.nombre,
					estado_color: estadoInfo.color,
					nombre_usuario: nombreUsuario
				};
			});
			
			logger.info({ count: tareasConEstado.length }, "Tareas obtenidas exitosamente");
			return tareasConEstado;
		} catch (error) {
			logger.error({ err: error, message: error.message, stack: error.stack }, "Error al obtener tareas");
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
					COALESCE(t.id_estado, 21) as id_estado,
					t.fecha_asignacion
				FROM public.tareas t
				WHERE t.id_usuarios = $1
				ORDER BY COALESCE(t.id_estado, 21) ASC, t.fecha_asignacion DESC, t.id_tareas DESC
			`;

			const result = await pool.query(query, [idUsuario]);
			
			// Obtener información de estados
			let estadosMap = {};
			try {
				const estadosQuery = await pool.query(`
					SELECT id_estado, nombre, color 
					FROM public.estado 
					WHERE id_estado IN (21, 22, 23)
				`);
				
				estadosQuery.rows.forEach(estado => {
					estadosMap[estado.id_estado] = {
						nombre: estado.nombre,
						color: estado.color
					};
				});
			} catch (estadosError) {
				logger.warn({ err: estadosError }, "No se pudieron obtener estados, usando valores por defecto");
			}
			
			// Valores por defecto si no se encontraron estados
			const estadosDefault = {
				21: { nombre: 'Pendiente', color: '#94a3b8' },
				22: { nombre: 'En proceso', color: '#3b82f6' },
				23: { nombre: 'Terminado', color: '#10b981' }
			};
			
			// Mapear tareas con información de estado
			const tareasConEstado = result.rows.map(tarea => {
				const idEstado = tarea.id_estado ?? 21;
				const estadoInfo = estadosMap[idEstado] || estadosDefault[idEstado] || estadosDefault[21];
				
				return {
					...tarea,
					id_estado: idEstado,
					estado_nombre: estadoInfo.nombre,
					estado_color: estadoInfo.color
				};
			});
			
			logger.info({ idUsuario, count: tareasConEstado.length }, "Tareas del usuario obtenidas exitosamente");
			return tareasConEstado;
		} catch (error) {
			logger.error({ err: error, idUsuario, message: error.message, stack: error.stack }, "Error al obtener tareas del usuario");
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
					id_estado,
					fecha_asignacion
				) VALUES ($1, $2, $3, $4, $5)
				RETURNING id_tareas, id_usuarios, descripcion, id_estado, fecha_asignacion
			`;

			const valores = [
				nextId,
				datosTarea.id_usuarios,
				datosTarea.descripcion,
				datosTarea.id_estado || 21, // Por defecto "Por hacer"
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

			if (datosTarea.id_estado !== undefined) {
				campos.push(`id_estado = $${contador}`);
				valores.push(datosTarea.id_estado);
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
				RETURNING id_tareas, id_usuarios, descripcion, id_estado, fecha_asignacion
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

