const usuariosService = require("./usuarios.service");
const { logger } = require("../../common/logger");

/**
 * Crea un nuevo usuario
 */
async function crearUsuario(req, res) {
	try {
		const datosUsuario = req.body;

		// Validaciones básicas
		if (!datosUsuario.documento || !datosUsuario.password) {
			return res.status(400).json({
				error: "Campos requeridos faltantes",
				message: "El documento y la contraseña son obligatorios"
			});
		}

		const usuarioCreado = await usuariosService.crearUsuario(datosUsuario);

		res.status(201).json({
			success: true,
			message: "Usuario creado exitosamente",
			usuario: usuarioCreado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearUsuario controller");
		
		if (error.message === "Ya existe un usuario con este documento") {
			return res.status(409).json({
				error: "Usuario duplicado",
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
 * Obtiene los catálogos para el formulario de creación
 */
async function obtenerCatalogos(req, res) {
	try {
		const catalogos = await usuariosService.obtenerCatalogos();
		
		res.json({
			success: true,
			catalogos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCatalogos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los usuarios con sus roles
 */
async function obtenerUsuarios(req, res) {
	try {
		const usuarios = await usuariosService.obtenerUsuarios();
		
		res.json({
			success: true,
			usuarios
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerUsuarios controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene un usuario completo por ID
 */
async function obtenerUsuarioPorId(req, res) {
	try {
		const { id } = req.params;
		const usuario = await usuariosService.obtenerUsuarioPorId(parseInt(id));
		
		res.json({
			success: true,
			usuario
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerUsuarioPorId controller");
		
		if (error.message === "Usuario no encontrado") {
			return res.status(404).json({
				error: "Usuario no encontrado",
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
 * Actualiza el estado de un usuario
 */
async function actualizarEstadoUsuario(req, res) {
	try {
		const { id } = req.params;
		const { id_estado } = req.body;

		if (!id_estado) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_estado es obligatorio"
			});
		}

		const usuarioActualizado = await usuariosService.actualizarEstadoUsuario(
			parseInt(id),
			parseInt(id_estado)
		);

		res.json({
			success: true,
			message: "Estado actualizado exitosamente",
			usuario: usuarioActualizado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarEstadoUsuario controller");
		
		if (error.message === "Usuario no encontrado") {
			return res.status(404).json({
				error: "Usuario no encontrado",
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
 * Actualiza un usuario completo
 */
async function actualizarUsuario(req, res) {
	try {
		const { id } = req.params;
		const datosUsuario = req.body;

		const usuarioActualizado = await usuariosService.actualizarUsuario(
			parseInt(id),
			datosUsuario
		);

		res.json({
			success: true,
			message: "Usuario actualizado exitosamente",
			usuario: usuarioActualizado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarUsuario controller");
		
		if (error.message === "Usuario no encontrado" || error.message === "Ya existe otro usuario con este documento") {
			return res.status(400).json({
				error: "Error de validación",
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
 * Obtiene las alertas/pendientes de todos los usuarios
 */
async function obtenerAlertasUsuarios(req, res) {
	try {
		const alertas = await usuariosService.obtenerAlertasUsuarios();
		
		res.json({
			success: true,
			alertas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerAlertasUsuarios controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	crearUsuario,
	obtenerCatalogos,
	obtenerUsuarios,
	obtenerUsuarioPorId,
	actualizarEstadoUsuario,
	actualizarUsuario,
	obtenerAlertasUsuarios
};

