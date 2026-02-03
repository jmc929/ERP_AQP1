const configuracionProduccionService = require("./configuracion-produccion.service");
const { logger } = require("../../common/logger");

// ========== TIPO MAQUINA ==========

async function obtenerTiposMaquina(req, res) {
	try {
		const tiposMaquina = await configuracionProduccionService.obtenerTiposMaquina();
		res.json({
			success: true,
			tiposMaquina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposMaquina controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearTipoMaquina(req, res) {
	try {
		const { nombre, descripcion, id_estado } = req.body;

		if (!nombre) {
			return res.status(400).json({
				success: false,
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipoMaquina = await configuracionProduccionService.crearTipoMaquina({
			nombre,
			descripcion,
			id_estado
		});

		res.status(201).json({
			success: true,
			message: "Tipo de máquina creado exitosamente",
			tipoMaquina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoMaquina controller");
		
		if (error.message === "Ya existe un tipo de máquina con este nombre") {
			return res.status(409).json({
				success: false,
				error: "Tipo de máquina duplicado",
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

async function actualizarTipoMaquina(req, res) {
	try {
		const { id } = req.params;
		const datosTipoMaquina = req.body;

		const tipoMaquina = await configuracionProduccionService.actualizarTipoMaquina(parseInt(id), datosTipoMaquina);
		res.json({
			success: true,
			message: "Tipo de máquina actualizado exitosamente",
			tipoMaquina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoMaquina controller");
		
		if (error.message === "Tipo de máquina no encontrado" || 
		    error.message === "Ya existe otro tipo de máquina con este nombre") {
			return res.status(400).json({
				success: false,
				error: "Error de validación",
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

async function eliminarTipoMaquina(req, res) {
	try {
		const { id } = req.params;
		await configuracionProduccionService.eliminarTipoMaquina(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de máquina eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoMaquina controller");
		
		if (error.message === "Tipo de máquina no encontrado") {
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

// ========== MAQUINAS ==========

async function obtenerMaquinas(req, res) {
	try {
		const maquinas = await configuracionProduccionService.obtenerMaquinas();
		res.json({
			success: true,
			maquinas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerMaquinas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearMaquina(req, res) {
	try {
		const { id_tipo_maquina, nombre, observaciones, id_estado } = req.body;

		if (!nombre) {
			return res.status(400).json({
				success: false,
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const maquina = await configuracionProduccionService.crearMaquina({
			id_tipo_maquina,
			nombre,
			observaciones,
			id_estado
		});

		res.status(201).json({
			success: true,
			message: "Máquina creada exitosamente",
			maquina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearMaquina controller");
		
		if (error.message === "Ya existe una máquina con este nombre" ||
		    error.message === "El tipo de máquina seleccionado no existe") {
			return res.status(409).json({
				success: false,
				error: "Error de validación",
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

async function actualizarMaquina(req, res) {
	try {
		const { id } = req.params;
		const datosMaquina = req.body;

		const maquina = await configuracionProduccionService.actualizarMaquina(parseInt(id), datosMaquina);
		res.json({
			success: true,
			message: "Máquina actualizada exitosamente",
			maquina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarMaquina controller");
		
		if (error.message === "Máquina no encontrada" || 
		    error.message === "Ya existe otra máquina con este nombre" ||
		    error.message === "El tipo de máquina seleccionado no existe") {
			return res.status(400).json({
				success: false,
				error: "Error de validación",
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

async function eliminarMaquina(req, res) {
	try {
		const { id } = req.params;
		await configuracionProduccionService.eliminarMaquina(parseInt(id));
		res.json({
			success: true,
			message: "Máquina eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarMaquina controller");
		
		if (error.message === "Máquina no encontrada") {
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
	obtenerTiposMaquina,
	crearTipoMaquina,
	actualizarTipoMaquina,
	eliminarTipoMaquina,
	obtenerMaquinas,
	crearMaquina,
	actualizarMaquina,
	eliminarMaquina
};

