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
		const { id_usuarios, descripcion, id_estado, fecha_asignacion } = req.body;

		if (!id_usuarios || !descripcion) {
			return res.status(400).json({
				error: "Campos requeridos faltantes",
				message: "El id_usuarios y la descripcion son obligatorios"
			});
		}

		// Solo usar fecha_asignacion si viene explícitamente y no está vacía
		// Si no viene o está vacía, se usará NOW() en la BD
		const fechaAsignacion = fecha_asignacion && fecha_asignacion.trim() !== "" 
			? fecha_asignacion 
			: null;

		const tarea = await tareasService.crearTarea({
			id_usuarios: parseInt(id_usuarios),
			descripcion,
			id_estado: id_estado ? parseInt(id_estado) : 21, // Por defecto "Por hacer"
			fecha_asignacion: fechaAsignacion
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

