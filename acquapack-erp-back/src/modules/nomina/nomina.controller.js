const nominaService = require("./nomina.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene todas las nóminas
 */
async function obtenerNominas(req, res) {
	try {
		const nominas = await nominaService.obtenerNominas();
		res.json({
			success: true,
			nominas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerNominas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene una nómina por ID con todos sus detalles
 */
async function obtenerNominaPorId(req, res) {
	try {
		const { id } = req.params;
		const nomina = await nominaService.obtenerNominaPorId(parseInt(id));
		res.json({
			success: true,
			nomina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerNominaPorId controller");
		
		if (error.message === "Nómina no encontrada") {
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
 * Crea una nueva nómina
 */
async function crearNomina(req, res) {
	try {
		// Obtener id_usuario_creador del header o del body
		const idUsuarioCreador = req.headers['x-user-id'] 
			? parseInt(req.headers['x-user-id']) 
			: (req.body.id_usuario_creador ? parseInt(req.body.id_usuario_creador) : null);

		if (!idUsuarioCreador) {
			return res.status(400).json({
				success: false,
				error: "No se pudo identificar al usuario creador"
			});
		}

		const datosNomina = {
			...req.body,
			id_usuario_creador: idUsuarioCreador
		};

		const nomina = await nominaService.crearNomina(datosNomina);
		res.status(201).json({
			success: true,
			nomina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearNomina controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los trabajadores
 */
async function obtenerTrabajadores(req, res) {
	try {
		const trabajadores = await nominaService.obtenerTrabajadores();
		res.json({
			success: true,
			trabajadores
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTrabajadores controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene los estados de nómina
 */
async function obtenerEstadosNomina(req, res) {
	try {
		const estados = await nominaService.obtenerEstadosNomina();
		res.json({
			success: true,
			estados
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerEstadosNomina controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los tipos de hora
 */
async function obtenerTiposHora(req, res) {
	try {
		const tiposHora = await nominaService.obtenerTiposHora();
		res.json({
			success: true,
			tiposHora
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposHora controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los tipos de deducción
 */
async function obtenerTiposDeduccion(req, res) {
	try {
		const tiposDeduccion = await nominaService.obtenerTiposDeduccion();
		res.json({
			success: true,
			tiposDeduccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposDeduccion controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerTrabajadores,
	obtenerEstadosNomina,
	obtenerTiposHora,
	obtenerTiposDeduccion,
	crearNomina,
	obtenerNominas,
	obtenerNominaPorId
};
