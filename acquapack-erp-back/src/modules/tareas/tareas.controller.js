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
		logger.error({ err: error }, "Error en obtenerTareas controller");
		res.status(500).json({
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
		const { id_usuarios, descripcion, completada, fecha_asignacion } = req.body;

		if (!id_usuarios || !descripcion) {
			return res.status(400).json({
				error: "Campos requeridos faltantes",
				message: "El id_usuarios y la descripcion son obligatorios"
			});
		}

		const tarea = await tareasService.crearTarea({
			id_usuarios: parseInt(id_usuarios),
			descripcion,
			completada: completada || false,
			fecha_asignacion: fecha_asignacion || new Date().toISOString().split('T')[0]
		});

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
	eliminarTarea
};

