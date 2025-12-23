const configuracionClientesService = require("./configuracion-clientes.service");
const { logger } = require("../../common/logger");

// ========== TIPO ENTIDAD ==========

async function obtenerTiposEntidad(req, res) {
	try {
		const tipos = await configuracionClientesService.obtenerTiposEntidad();
		res.json({
			success: true,
			tiposEntidad: tipos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposEntidad controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearTipoEntidad(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionClientesService.crearTipoEntidad({ nombre });
		res.status(201).json({
			success: true,
			message: "Tipo de entidad creado exitosamente",
			tipoEntidad: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoEntidad controller");
		
		if (error.message === "Ya existe un tipo de entidad con este nombre") {
			return res.status(409).json({
				error: "Tipo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarTipoEntidad(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionClientesService.actualizarTipoEntidad(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Tipo de entidad actualizado exitosamente",
			tipoEntidad: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoEntidad controller");
		
		if (error.message === "Tipo de entidad no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro tipo de entidad con este nombre") {
			return res.status(409).json({
				error: "Tipo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarTipoEntidad(req, res) {
	try {
		const { id } = req.params;
		await configuracionClientesService.eliminarTipoEntidad(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de entidad eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoEntidad controller");
		
		if (error.message === "Tipo de entidad no encontrado") {
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

// ========== CIUDAD ==========

async function obtenerCiudades(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 30;
		
		const resultado = await configuracionClientesService.obtenerCiudades(page, limit);
		res.json({
			success: true,
			ciudades: resultado.ciudades,
			paginacion: resultado.paginacion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCiudades controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearCiudad(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const ciudad = await configuracionClientesService.crearCiudad({ nombre });
		res.status(201).json({
			success: true,
			message: "Ciudad creada exitosamente",
			ciudad: ciudad
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearCiudad controller");
		
		if (error.message === "Ya existe una ciudad con este nombre") {
			return res.status(409).json({
				error: "Ciudad duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarCiudad(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const ciudad = await configuracionClientesService.actualizarCiudad(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Ciudad actualizada exitosamente",
			ciudad: ciudad
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarCiudad controller");
		
		if (error.message === "Ciudad no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra ciudad con este nombre") {
			return res.status(409).json({
				error: "Ciudad duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarCiudad(req, res) {
	try {
		const { id } = req.params;
		await configuracionClientesService.eliminarCiudad(parseInt(id));
		res.json({
			success: true,
			message: "Ciudad eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarCiudad controller");
		
		if (error.message === "Ciudad no encontrada") {
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

// ========== TIPO REGIMEN IVA ==========

async function obtenerTiposRegimenIva(req, res) {
	try {
		const tipos = await configuracionClientesService.obtenerTiposRegimenIva();
		res.json({
			success: true,
			tiposRegimenIva: tipos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposRegimenIva controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearTipoRegimenIva(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionClientesService.crearTipoRegimenIva({ nombre });
		res.status(201).json({
			success: true,
			message: "Tipo de régimen IVA creado exitosamente",
			tipoRegimenIva: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoRegimenIva controller");
		
		if (error.message === "Ya existe un tipo de régimen IVA con este nombre") {
			return res.status(409).json({
				error: "Tipo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarTipoRegimenIva(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionClientesService.actualizarTipoRegimenIva(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Tipo de régimen IVA actualizado exitosamente",
			tipoRegimenIva: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoRegimenIva controller");
		
		if (error.message === "Tipo de régimen IVA no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro tipo de régimen IVA con este nombre") {
			return res.status(409).json({
				error: "Tipo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarTipoRegimenIva(req, res) {
	try {
		const { id } = req.params;
		await configuracionClientesService.eliminarTipoRegimenIva(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de régimen IVA eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoRegimenIva controller");
		
		if (error.message === "Tipo de régimen IVA no encontrado") {
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

// ========== RESPONSABILIDAD FISCAL ==========

async function obtenerResponsabilidadesFiscales(req, res) {
	try {
		const responsabilidades = await configuracionClientesService.obtenerResponsabilidadesFiscales();
		res.json({
			success: true,
			responsabilidadesFiscales: responsabilidades
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerResponsabilidadesFiscales controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearResponsabilidadFiscal(req, res) {
	try {
		const { nombre, codigo } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const responsabilidad = await configuracionClientesService.crearResponsabilidadFiscal({ nombre, codigo });
		res.status(201).json({
			success: true,
			message: "Responsabilidad fiscal creada exitosamente",
			responsabilidadFiscal: responsabilidad
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearResponsabilidadFiscal controller");
		
		if (error.message === "Ya existe una responsabilidad fiscal con este nombre") {
			return res.status(409).json({
				error: "Responsabilidad duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarResponsabilidadFiscal(req, res) {
	try {
		const { id } = req.params;
		const { nombre, codigo } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const responsabilidad = await configuracionClientesService.actualizarResponsabilidadFiscal(parseInt(id), { nombre, codigo });
		res.json({
			success: true,
			message: "Responsabilidad fiscal actualizada exitosamente",
			responsabilidadFiscal: responsabilidad
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarResponsabilidadFiscal controller");
		
		if (error.message === "Responsabilidad fiscal no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra responsabilidad fiscal con este nombre") {
			return res.status(409).json({
				error: "Responsabilidad duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarResponsabilidadFiscal(req, res) {
	try {
		const { id } = req.params;
		await configuracionClientesService.eliminarResponsabilidadFiscal(parseInt(id));
		res.json({
			success: true,
			message: "Responsabilidad fiscal eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarResponsabilidadFiscal controller");
		
		if (error.message === "Responsabilidad fiscal no encontrada") {
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
	obtenerTiposEntidad,
	crearTipoEntidad,
	actualizarTipoEntidad,
	eliminarTipoEntidad,
	obtenerCiudades,
	crearCiudad,
	actualizarCiudad,
	eliminarCiudad,
	obtenerTiposRegimenIva,
	crearTipoRegimenIva,
	actualizarTipoRegimenIva,
	eliminarTipoRegimenIva,
	obtenerResponsabilidadesFiscales,
	crearResponsabilidadFiscal,
	actualizarResponsabilidadFiscal,
	eliminarResponsabilidadFiscal
};

