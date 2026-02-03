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
					t.fecha_asignacion,
					t.id_usuario_creador
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
			
			// Obtener usuarios (tanto asignados como creadores)
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
				const nombreUsuarioCreador = tarea.id_usuario_creador 
					? (usuariosMap[tarea.id_usuario_creador] || 'Usuario desconocido')
					: null;
				
				return {
					...tarea,
					id_estado: idEstado,
					estado_nombre: estadoInfo.nombre,
					estado_color: estadoInfo.color,
					nombre_usuario: nombreUsuario,
					nombre_usuario_creador: nombreUsuarioCreador
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
					t.fecha_asignacion,
					t.id_usuario_creador
				FROM public.tareas t
				WHERE t.id_usuarios = $1
				ORDER BY COALESCE(t.id_estado, 21) ASC, t.fecha_asignacion DESC, t.id_tareas DESC
			`;

			const result = await pool.query(query, [idUsuario]);
			
			// Obtener usuarios (para el creador)
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
				const nombreUsuarioCreador = tarea.id_usuario_creador 
					? (usuariosMap[tarea.id_usuario_creador] || 'Usuario desconocido')
					: null;
				
				return {
					...tarea,
					id_estado: idEstado,
					estado_nombre: estadoInfo.nombre,
					estado_color: estadoInfo.color,
					nombre_usuario_creador: nombreUsuarioCreador
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
			logger.info("=== INICIO crearTarea SERVICE ===");
			logger.info("Datos recibidos en servicio:", JSON.stringify(datosTarea));

			// Obtener el siguiente ID
			const idResult = await pool.query(
				"SELECT COALESCE(MAX(id_tareas), 0) + 1 as next_id FROM public.tareas"
			);
			const nextId = idResult.rows[0].next_id;

			// Si fecha_asignacion viene, usarla. Si no, dejar que la BD use el DEFAULT
			const tieneFechaAsignacion = datosTarea.fecha_asignacion && 
				datosTarea.fecha_asignacion !== null && 
				datosTarea.fecha_asignacion !== undefined &&
				String(datosTarea.fecha_asignacion).trim() !== "";

			console.log("=== SERVICIO DEBUG ===");
			console.log("id_usuario_creador recibido en servicio:", datosTarea.id_usuario_creador);
			console.log("Tipo de id_usuario_creador:", typeof datosTarea.id_usuario_creador);
			console.log("id_usuario_creador es null/undefined?:", datosTarea.id_usuario_creador == null);
			logger.info("id_usuario_creador recibido en servicio:", datosTarea.id_usuario_creador);
			logger.info("Tipo de id_usuario_creador:", typeof datosTarea.id_usuario_creador);
			logger.info("id_usuario_creador es null/undefined?:", datosTarea.id_usuario_creador == null);

			// Asegurar que id_usuario_creador sea un número válido o null
			const idUsuarioCreadorFinal = (datosTarea.id_usuario_creador != null && datosTarea.id_usuario_creador !== undefined && datosTarea.id_usuario_creador !== '')
				? parseInt(datosTarea.id_usuario_creador)
				: null;

			console.log("id_usuario_creador final que se insertará:", idUsuarioCreadorFinal);
			logger.info("id_usuario_creador final que se insertará:", idUsuarioCreadorFinal);

			const query = tieneFechaAsignacion
				? `
					INSERT INTO public.tareas (
						id_tareas,
						id_usuarios,
						descripcion,
						id_estado,
						fecha_asignacion,
						id_usuario_creador
					) VALUES ($1, $2, $3, $4, $5::timestamp, $6)
					RETURNING id_tareas, id_usuarios, descripcion, id_estado, fecha_asignacion, id_usuario_creador
				`
				: `
					INSERT INTO public.tareas (
						id_tareas,
						id_usuarios,
						descripcion,
						id_estado,
						id_usuario_creador
					) VALUES ($1, $2, $3, $4, $5)
					RETURNING id_tareas, id_usuarios, descripcion, id_estado, fecha_asignacion, id_usuario_creador
				`;

			const valores = tieneFechaAsignacion
				? [
					nextId,
					datosTarea.id_usuarios,
					datosTarea.descripcion,
					datosTarea.id_estado || 21, // Por defecto "Por hacer"
					datosTarea.fecha_asignacion,
					idUsuarioCreadorFinal
				]
				: [
					nextId,
					datosTarea.id_usuarios,
					datosTarea.descripcion,
					datosTarea.id_estado || 21, // Por defecto "Por hacer"
					idUsuarioCreadorFinal
				];

			console.log("=== ANTES DE INSERTAR ===");
			console.log("Valores que se insertarán:", valores);
			console.log("Query a ejecutar:", query);
			console.log("Valor específico de id_usuario_creador en array (último elemento):", valores[valores.length - 1]);
			console.log("Índice del último elemento:", valores.length - 1);
			logger.info("Valores que se insertarán:", valores);
			logger.info("Query a ejecutar:", query);
			logger.info("Valor específico de id_usuario_creador en array:", valores[valores.length - 1]);

			try {
				// Log directo antes de ejecutar - FORZAR SALIDA
				console.log("\n\n========== EJECUTANDO INSERCIÓN ==========");
				console.log("VALORES:", JSON.stringify(valores, null, 2));
				console.log("QUERY:", query.replace(/\s+/g, ' ').trim());
				console.log("idUsuarioCreadorFinal:", idUsuarioCreadorFinal);
				console.log("Tipo:", typeof idUsuarioCreadorFinal);
				console.log("==========================================\n");
				
				const result = await pool.query(query, valores);
				
				console.log("\n========== RESULTADO DE LA INSERCIÓN ==========");
				console.log("id_tareas:", result.rows[0].id_tareas);
				console.log("id_usuario_creador guardado:", result.rows[0].id_usuario_creador);
				console.log("Fila completa:", JSON.stringify(result.rows[0], null, 2));
				console.log("==============================================\n\n");
				
				logger.info({ 
					tareaId: result.rows[0].id_tareas,
					id_usuario_creador_guardado: result.rows[0].id_usuario_creador,
					todosLosValoresRetornados: result.rows[0]
				}, "Tarea creada exitosamente");
				
				// Verificar que el valor se guardó correctamente
				if (result.rows[0].id_usuario_creador === null && idUsuarioCreadorFinal !== null) {
					console.error("❌ ERROR: El id_usuario_creador se envió pero se guardó como NULL");
					console.error("Valor enviado:", idUsuarioCreadorFinal);
					console.error("Valor guardado:", result.rows[0].id_usuario_creador);
					console.error("Query:", query);
					console.error("Valores:", valores);
					
					logger.error({
						valorEnviado: idUsuarioCreadorFinal,
						valorGuardado: result.rows[0].id_usuario_creador,
						query: query,
						valores: valores
					}, "ERROR: El id_usuario_creador se envió pero se guardó como NULL");
				} else if (result.rows[0].id_usuario_creador !== null) {
					console.log("✅ ÉXITO: id_usuario_creador se guardó correctamente:", result.rows[0].id_usuario_creador);
				}
				
				return result.rows[0];
			} catch (error) {
				logger.error({
					error: error.message,
					stack: error.stack,
					query: query,
					valores: valores,
					idUsuarioCreadorFinal: idUsuarioCreadorFinal
				}, "ERROR al insertar tarea en la base de datos");
				throw error;
			}
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
				RETURNING id_tareas, id_usuarios, descripcion, id_estado, fecha_asignacion, id_usuario_creador
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

