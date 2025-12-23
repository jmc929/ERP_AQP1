const configuracionProductosService = require("./configuracion-productos.service");
const { logger } = require("../../common/logger");

// ========== GRUPOS ==========

async function obtenerGrupos(req, res) {
	try {
		const grupos = await configuracionProductosService.obtenerGrupos();
		res.json({
			success: true,
			grupos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerGrupos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearGrupo(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const grupo = await configuracionProductosService.crearGrupo({ nombre });
		res.status(201).json({
			success: true,
			message: "Grupo creado exitosamente",
			grupo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearGrupo controller");
		
		if (error.message === "Ya existe un grupo con este nombre") {
			return res.status(409).json({
				error: "Grupo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarGrupo(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const grupo = await configuracionProductosService.actualizarGrupo(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Grupo actualizado exitosamente",
			grupo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarGrupo controller");
		
		if (error.message === "Grupo no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro grupo con este nombre") {
			return res.status(409).json({
				error: "Grupo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarGrupo(req, res) {
	try {
		const { id } = req.params;
		await configuracionProductosService.eliminarGrupo(parseInt(id));
		res.json({
			success: true,
			message: "Grupo eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarGrupo controller");
		
		if (error.message === "Grupo no encontrado") {
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

// ========== FAMILIAS ==========

async function obtenerFamilias(req, res) {
	try {
		const familias = await configuracionProductosService.obtenerFamilias();
		res.json({
			success: true,
			familias
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerFamilias controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearFamilia(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const familia = await configuracionProductosService.crearFamilia({ nombre });
		res.status(201).json({
			success: true,
			message: "Familia creada exitosamente",
			familia
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearFamilia controller");
		
		if (error.message === "Ya existe una familia con este nombre") {
			return res.status(409).json({
				error: "Familia duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarFamilia(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const familia = await configuracionProductosService.actualizarFamilia(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Familia actualizada exitosamente",
			familia
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarFamilia controller");
		
		if (error.message === "Familia no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra familia con este nombre") {
			return res.status(409).json({
				error: "Familia duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarFamilia(req, res) {
	try {
		const { id } = req.params;
		await configuracionProductosService.eliminarFamilia(parseInt(id));
		res.json({
			success: true,
			message: "Familia eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarFamilia controller");
		
		if (error.message === "Familia no encontrada") {
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

// ========== MEDIDAS ==========

async function obtenerMedidas(req, res) {
	try {
		const medidas = await configuracionProductosService.obtenerMedidas();
		res.json({
			success: true,
			medidas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerMedidas controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearMedida(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const medida = await configuracionProductosService.crearMedida({ nombre });
		res.status(201).json({
			success: true,
			message: "Medida creada exitosamente",
			medida
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearMedida controller");
		
		if (error.message === "Ya existe una medida con este nombre") {
			return res.status(409).json({
				error: "Medida duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarMedida(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const medida = await configuracionProductosService.actualizarMedida(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Medida actualizada exitosamente",
			medida
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarMedida controller");
		
		if (error.message === "Medida no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra medida con este nombre") {
			return res.status(409).json({
				error: "Medida duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarMedida(req, res) {
	try {
		const { id } = req.params;
		await configuracionProductosService.eliminarMedida(parseInt(id));
		res.json({
			success: true,
			message: "Medida eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarMedida controller");
		
		if (error.message === "Medida no encontrada") {
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

// ========== GENERAR PDF CÓDIGOS DE BARRAS ==========

async function generarPDFCodigosBarras(req, res) {
	try {
		const { ids_productos } = req.body;

		if (!ids_productos || !Array.isArray(ids_productos) || ids_productos.length === 0) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "Debe proporcionar un array de IDs de productos"
			});
		}

		const pdfBuffer = await configuracionProductosService.generarPDFCodigosBarras(ids_productos);

		// Configurar headers para descargar el PDF
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", `attachment; filename="codigos_barras_${Date.now()}.pdf"`);
		res.setHeader("Content-Length", pdfBuffer.length);

		res.send(pdfBuffer);
	} catch (error) {
		logger.error({ err: error }, "Error en generarPDFCodigosBarras controller");
		
		if (error.message === "Debe seleccionar al menos un producto" || 
		    error.message === "No se encontraron productos con código de barras válido") {
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

module.exports = {
	obtenerGrupos,
	crearGrupo,
	actualizarGrupo,
	eliminarGrupo,
	obtenerFamilias,
	crearFamilia,
	actualizarFamilia,
	eliminarFamilia,
	obtenerMedidas,
	crearMedida,
	actualizarMedida,
	eliminarMedida,
	generarPDFCodigosBarras
};

