const tareasService = require("./tareas.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene todas las tareas
 */
async function obtenerTareas(req, res) {
	try {
		const tareas = await tareasService.obtenerTareas();
		res.json({
			success: true,
			tareas
		});
	} catch (error) {
		logger.error({ err: error, message: error.message, stack: error.stack }, "Error en obtenerTareas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todas las tareas de un usuario específico
 */
async function obtenerTareasPorUsuario(req, res) {
	try {
		const { idUsuario } = req.params;
		const tareas = await tareasService.obtenerTareasPorUsuario(parseInt(idUsuario));
		res.json({
			success: true,
			tareas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTareasPorUsuario controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Crea una nueva tarea
 */
	async function crearTarea(req, res) {
	try {
		// Log inicial para verificar que la función se está ejecutando
		logger.info("=== INICIO crearTarea ===");
		logger.info("Body recibido:", JSON.stringify(req.body));
		logger.info("Headers recibidos:", JSON.stringify(req.headers));

		const { id_usuarios, descripcion, id_estado, fecha_asignacion, id_usuario_creador } = req.body;

		// Log directo con console.log para asegurar que se vea
		console.log("=== CONSOLE.LOG DEBUG ===");
		console.log("req.body completo:", JSON.stringify(req.body, null, 2));
		console.log("id_usuario_creador del body:", id_usuario_creador);
		console.log("Tipo de id_usuario_creador:", typeof id_usuario_creador);

		if (!id_usuarios || !descripcion) {
			return res.status(400).json({
				error: "Campos requeridos faltantes",
				message: "El id_usuarios y la descripcion son obligatorios"
			});
		}

		// Obtener el ID del usuario logueado desde el header o body
		// Express normaliza los headers, pero puede variar según la versión
		// Buscar en todos los headers posibles
		const todosLosHeaders = req.headers;
		logger.info("Todos los headers recibidos:", Object.keys(todosLosHeaders));
		
		// Buscar header con diferentes variantes
		const headerUserId = todosLosHeaders['x-user-id'] || 
			todosLosHeaders['x-userid'] ||
			todosLosHeaders['xuserid'] ||
			todosLosHeaders['X-User-Id'] || 
			todosLosHeaders['X-USER-ID'] ||
			todosLosHeaders['x-user-id'] ||
			// Buscar cualquier header que contenga 'user' e 'id'
			Object.keys(todosLosHeaders).find(key => 
				key.toLowerCase().includes('user') && key.toLowerCase().includes('id')
			) ? todosLosHeaders[Object.keys(todosLosHeaders).find(key => 
				key.toLowerCase().includes('user') && key.toLowerCase().includes('id')
			)] : null;
		
		logger.info("Header x-user-id encontrado:", headerUserId);
		logger.info("Body id_usuario_creador:", id_usuario_creador);
		logger.info("Tipo de headerUserId:", typeof headerUserId);
		
		let idUsuarioCreador = null;
		
		// Prioridad: 1) body (más confiable), 2) header
		if (id_usuario_creador != null && id_usuario_creador !== undefined && id_usuario_creador !== '') {
			idUsuarioCreador = parseInt(id_usuario_creador);
			console.log("Usando body, idUsuarioCreador:", idUsuarioCreador);
			logger.info("Usando body, idUsuarioCreador:", idUsuarioCreador);
		} else if (headerUserId != null && headerUserId !== undefined && headerUserId !== '') {
			idUsuarioCreador = parseInt(headerUserId);
			console.log("Usando header, idUsuarioCreador:", idUsuarioCreador);
			logger.info("Usando header, idUsuarioCreador:", idUsuarioCreador);
		} else {
			console.log("ERROR: No se encontró id_usuario_creador ni en body ni en header");
			console.log("id_usuario_creador del body:", id_usuario_creador);
			console.log("headerUserId:", headerUserId);
		}

		// Log para debugging
		logger.info({ 
			headerUserId,
			bodyIdUsuarioCreador: id_usuario_creador,
			idUsuarioCreadorFinal: idUsuarioCreador,
			esNumero: !isNaN(idUsuarioCreador)
		}, "Resultado obtención usuario creador");

		if (!idUsuarioCreador || isNaN(idUsuarioCreador)) {
			logger.error({ 
				headerUserId,
				bodyIdUsuarioCreador: id_usuario_creador,
				todosLosHeaders: Object.keys(req.headers).filter(h => h.toLowerCase().includes('user'))
			}, "ERROR: No se pudo obtener el ID del usuario creador");
			
			// Por ahora, permitir continuar pero con null (para no romper el flujo)
			// En producción deberías retornar error
			logger.warn("Continuando con id_usuario_creador = null (debería ser un error en producción)");
		}

		// Solo usar fecha_asignacion si viene explícitamente y no está vacía
		// Si no viene o está vacía, se usará NOW() en la BD
		const fechaAsignacion = fecha_asignacion && fecha_asignacion.trim() !== "" 
			? fecha_asignacion 
			: null;

		// Log antes de llamar al servicio
		console.log("=== ANTES DE LLAMAR AL SERVICIO ===");
		console.log("idUsuarioCreador que se pasará al servicio:", idUsuarioCreador);
		console.log("Tipo:", typeof idUsuarioCreador);
		logger.info("=== ANTES DE LLAMAR AL SERVICIO ===");
		logger.info("idUsuarioCreador que se pasará al servicio:", idUsuarioCreador);
		logger.info("Tipo:", typeof idUsuarioCreador);

		const datosParaServicio = {
			id_usuarios: parseInt(id_usuarios),
			descripcion,
			id_estado: id_estado ? parseInt(id_estado) : 21, // Por defecto "Por hacer"
			fecha_asignacion: fechaAsignacion,
			id_usuario_creador: idUsuarioCreador
		};

		console.log("Datos completos que se pasarán al servicio:", JSON.stringify(datosParaServicio, null, 2));
		logger.info("Datos completos que se pasarán al servicio:", JSON.stringify(datosParaServicio));

		const tarea = await tareasService.crearTarea(datosParaServicio);

		res.status(201).json({
			success: true,
			message: "Tarea creada exitosamente",
			tarea
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTarea controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Actualiza una tarea
 */
async function actualizarTarea(req, res) {
	try {
		const { id } = req.params;
		const datosTarea = req.body;

		const tarea = await tareasService.actualizarTarea(parseInt(id), datosTarea);
		res.json({
			success: true,
			message: "Tarea actualizada exitosamente",
			tarea
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTarea controller");
		
		if (error.message === "Tarea no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Cambia el estado de una tarea
 */
async function cambiarEstadoTarea(req, res) {
	try {
		const { id } = req.params;
		const { id_estado } = req.body;

		if (!id_estado) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_estado es obligatorio"
			});
		}

		const tarea = await tareasService.actualizarTarea(parseInt(id), {
			id_estado: parseInt(id_estado)
		});
		
		res.json({
			success: true,
			message: "Estado de tarea actualizado exitosamente",
			tarea
		});
	} catch (error) {
		logger.error({ err: error }, "Error en cambiarEstadoTarea controller");
		
		if (error.message === "Tarea no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Elimina una tarea
 */
async function eliminarTarea(req, res) {
	try {
		const { id } = req.params;
		await tareasService.eliminarTarea(parseInt(id));
		res.json({
			success: true,
			message: "Tarea eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTarea controller");
		
		if (error.message === "Tarea no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerTareas,
	obtenerTareasPorUsuario,
	crearTarea,
	actualizarTarea,
	cambiarEstadoTarea,
	eliminarTarea
};

