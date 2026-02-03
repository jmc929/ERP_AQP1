const notasService = require("./notas.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene todas las notas de un usuario
 */
async function obtenerNotasPorUsuario(req, res) {
	try {
		const { idUsuario } = req.params;
		const notas = await notasService.obtenerNotasPorUsuario(parseInt(idUsuario));
		res.json({
			success: true,
			notas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerNotasPorUsuario controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todas las notas (para administradores)
 */
async function obtenerTodasLasNotas(req, res) {
	try {
		const notas = await notasService.obtenerTodasLasNotas();
		res.json({
			success: true,
			notas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTodasLasNotas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene una nota por su ID
 */
async function obtenerNotaPorId(req, res) {
	try {
		const { id } = req.params;
		const nota = await notasService.obtenerNotaPorId(parseInt(id));
		res.json({
			success: true,
			nota
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerNotaPorId controller");
		
		if (error.message === "Nota no encontrada") {
			return res.status(404).json({
				success: false,
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Crea una nueva nota
 */
async function crearNota(req, res) {
	try {
		const { titulo, nota, id_usuario } = req.body;

		if (!titulo || !nota || !id_usuario) {
			return res.status(400).json({
				success: false,
				error: "Campos requeridos faltantes",
				message: "El titulo, nota e id_usuario son obligatorios"
			});
		}

		// Obtener el ID del usuario logueado desde el header o body
		// Express normaliza los headers a minúsculas, así que 'x-user-id' puede venir como 'x-user-id'
		// También intentamos diferentes variantes del nombre del header
		const headerUserId = req.headers['x-user-id'] || 
			req.headers['X-User-Id'] || 
			req.headers['X-USER-ID'] ||
			req.headers['x-userid'] ||
			req.headers['xuserid'];
		
		const idUsuarioCreador = headerUserId 
			? parseInt(headerUserId) 
			: (req.body.id_usuario_creador ? parseInt(req.body.id_usuario_creador) : null);

		// Log para debugging
		logger.info({ 
			headers: req.headers,
			headerUserId,
			idUsuarioCreador,
			bodyIdUsuarioCreador: req.body.id_usuario_creador
		}, "Intentando obtener usuario creador para nota");

		if (!idUsuarioCreador || isNaN(idUsuarioCreador)) {
			logger.warn({ 
				headerUserId,
				bodyIdUsuarioCreador: req.body.id_usuario_creador,
				headers: Object.keys(req.headers)
			}, "No se pudo obtener el ID del usuario creador para nota");
			
			return res.status(400).json({
				success: false,
				error: "Usuario no identificado",
				message: "No se pudo identificar al usuario logueado. Por favor, asegúrate de estar autenticado."
			});
		}

		const notaCreada = await notasService.crearNota({
			titulo,
			nota,
			id_usuario: parseInt(id_usuario),
			id_usuario_creador: idUsuarioCreador
		});

		res.status(201).json({
			success: true,
			message: "Nota creada exitosamente",
			nota: notaCreada
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearNota controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Actualiza una nota
 */
async function actualizarNota(req, res) {
	try {
		const { id } = req.params;
		const { titulo, nota } = req.body;

		if (!titulo || !nota) {
			return res.status(400).json({
				success: false,
				error: "Campos requeridos faltantes",
				message: "El titulo y nota son obligatorios"
			});
		}

		const notaActualizada = await notasService.actualizarNota(parseInt(id), {
			titulo,
			nota
		});

		res.json({
			success: true,
			message: "Nota actualizada exitosamente",
			nota: notaActualizada
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarNota controller");
		
		if (error.message === "Nota no encontrada") {
			return res.status(404).json({
				success: false,
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Elimina una nota
 */
async function eliminarNota(req, res) {
	try {
		const { id } = req.params;
		await notasService.eliminarNota(parseInt(id));
		res.json({
			success: true,
			message: "Nota eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarNota controller");
		
		if (error.message === "Nota no encontrada") {
			return res.status(404).json({
				success: false,
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerNotasPorUsuario,
	obtenerTodasLasNotas,
	obtenerNotaPorId,
	crearNota,
	actualizarNota,
	eliminarNota
};

