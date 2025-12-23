const configuracionUsuariosService = require("./configuracion-usuarios.service");
const { logger } = require("../../common/logger");

// ========== TIPO IDENTIFICACION ==========

async function obtenerTiposIdentificacion(req, res) {
	try {
		const tipos = await configuracionUsuariosService.obtenerTiposIdentificacion();
		res.json({
			success: true,
			tiposIdentificacion: tipos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposIdentificacion controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearTipoIdentificacion(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionUsuariosService.crearTipoIdentificacion({ nombre });
		res.status(201).json({
			success: true,
			message: "Tipo de identificación creado exitosamente",
			tipoIdentificacion: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoIdentificacion controller");
		
		if (error.message === "Ya existe un tipo de identificación con este nombre") {
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

async function actualizarTipoIdentificacion(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionUsuariosService.actualizarTipoIdentificacion(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Tipo de identificación actualizado exitosamente",
			tipoIdentificacion: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoIdentificacion controller");
		
		if (error.message === "Tipo de identificación no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro tipo de identificación con este nombre") {
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

async function eliminarTipoIdentificacion(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarTipoIdentificacion(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de identificación eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoIdentificacion controller");
		
		if (error.message === "Tipo de identificación no encontrado") {
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

// ========== TIPO CONTRATO ==========

async function obtenerTiposContrato(req, res) {
	try {
		const tipos = await configuracionUsuariosService.obtenerTiposContrato();
		res.json({
			success: true,
			tiposContrato: tipos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposContrato controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearTipoContrato(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionUsuariosService.crearTipoContrato({ nombre });
		res.status(201).json({
			success: true,
			message: "Tipo de contrato creado exitosamente",
			tipoContrato: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoContrato controller");
		
		if (error.message === "Ya existe un tipo de contrato con este nombre") {
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

async function actualizarTipoContrato(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipo = await configuracionUsuariosService.actualizarTipoContrato(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Tipo de contrato actualizado exitosamente",
			tipoContrato: tipo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoContrato controller");
		
		if (error.message === "Tipo de contrato no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro tipo de contrato con este nombre") {
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

async function eliminarTipoContrato(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarTipoContrato(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de contrato eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoContrato controller");
		
		if (error.message === "Tipo de contrato no encontrado") {
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

// ========== ESTADO CIVIL ==========

async function obtenerEstadosCiviles(req, res) {
	try {
		const estados = await configuracionUsuariosService.obtenerEstadosCiviles();
		res.json({
			success: true,
			estadosCiviles: estados
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerEstadosCiviles controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearEstadoCivil(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const estado = await configuracionUsuariosService.crearEstadoCivil({ nombre });
		res.status(201).json({
			success: true,
			message: "Estado civil creado exitosamente",
			estadoCivil: estado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearEstadoCivil controller");
		
		if (error.message === "Ya existe un estado civil con este nombre") {
			return res.status(409).json({
				error: "Estado duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarEstadoCivil(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const estado = await configuracionUsuariosService.actualizarEstadoCivil(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Estado civil actualizado exitosamente",
			estadoCivil: estado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarEstadoCivil controller");
		
		if (error.message === "Estado civil no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro estado civil con este nombre") {
			return res.status(409).json({
				error: "Estado duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarEstadoCivil(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarEstadoCivil(parseInt(id));
		res.json({
			success: true,
			message: "Estado civil eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarEstadoCivil controller");
		
		if (error.message === "Estado civil no encontrado") {
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

// ========== ARL ==========

async function obtenerArls(req, res) {
	try {
		const arls = await configuracionUsuariosService.obtenerArls();
		res.json({
			success: true,
			arls: arls
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerArls controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearArl(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const arl = await configuracionUsuariosService.crearArl({ nombre });
		res.status(201).json({
			success: true,
			message: "ARL creada exitosamente",
			arl: arl
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearArl controller");
		
		if (error.message === "Ya existe una ARL con este nombre") {
			return res.status(409).json({
				error: "ARL duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarArl(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const arl = await configuracionUsuariosService.actualizarArl(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "ARL actualizada exitosamente",
			arl: arl
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarArl controller");
		
		if (error.message === "ARL no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra ARL con este nombre") {
			return res.status(409).json({
				error: "ARL duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarArl(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarArl(parseInt(id));
		res.json({
			success: true,
			message: "ARL eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarArl controller");
		
		if (error.message === "ARL no encontrada") {
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

// ========== EPS ==========

async function obtenerEpss(req, res) {
	try {
		const epss = await configuracionUsuariosService.obtenerEpss();
		res.json({
			success: true,
			epss: epss
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerEpss controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearEps(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const eps = await configuracionUsuariosService.crearEps({ nombre });
		res.status(201).json({
			success: true,
			message: "EPS creada exitosamente",
			eps: eps
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearEps controller");
		
		if (error.message === "Ya existe una EPS con este nombre") {
			return res.status(409).json({
				error: "EPS duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarEps(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const eps = await configuracionUsuariosService.actualizarEps(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "EPS actualizada exitosamente",
			eps: eps
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarEps controller");
		
		if (error.message === "EPS no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra EPS con este nombre") {
			return res.status(409).json({
				error: "EPS duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarEps(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarEps(parseInt(id));
		res.json({
			success: true,
			message: "EPS eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarEps controller");
		
		if (error.message === "EPS no encontrada") {
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

// ========== CAJA COMPENSACION ==========

async function obtenerCajasCompensacion(req, res) {
	try {
		const cajas = await configuracionUsuariosService.obtenerCajasCompensacion();
		res.json({
			success: true,
			cajasCompensacion: cajas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCajasCompensacion controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearCajaCompensacion(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const caja = await configuracionUsuariosService.crearCajaCompensacion({ nombre });
		res.status(201).json({
			success: true,
			message: "Caja de compensación creada exitosamente",
			cajaCompensacion: caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearCajaCompensacion controller");
		
		if (error.message === "Ya existe una caja de compensación con este nombre") {
			return res.status(409).json({
				error: "Caja duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarCajaCompensacion(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const caja = await configuracionUsuariosService.actualizarCajaCompensacion(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Caja de compensación actualizada exitosamente",
			cajaCompensacion: caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarCajaCompensacion controller");
		
		if (error.message === "Caja de compensación no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra caja de compensación con este nombre") {
			return res.status(409).json({
				error: "Caja duplicada",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarCajaCompensacion(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarCajaCompensacion(parseInt(id));
		res.json({
			success: true,
			message: "Caja de compensación eliminada exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarCajaCompensacion controller");
		
		if (error.message === "Caja de compensación no encontrada") {
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

// ========== FONDO PENSIONES ==========

async function obtenerFondosPensiones(req, res) {
	try {
		const fondos = await configuracionUsuariosService.obtenerFondosPensiones();
		res.json({
			success: true,
			fondosPensiones: fondos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerFondosPensiones controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearFondoPensiones(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const fondo = await configuracionUsuariosService.crearFondoPensiones({ nombre });
		res.status(201).json({
			success: true,
			message: "Fondo de pensiones creado exitosamente",
			fondoPensiones: fondo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearFondoPensiones controller");
		
		if (error.message === "Ya existe un fondo de pensiones con este nombre") {
			return res.status(409).json({
				error: "Fondo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarFondoPensiones(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const fondo = await configuracionUsuariosService.actualizarFondoPensiones(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Fondo de pensiones actualizado exitosamente",
			fondoPensiones: fondo
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarFondoPensiones controller");
		
		if (error.message === "Fondo de pensiones no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro fondo de pensiones con este nombre") {
			return res.status(409).json({
				error: "Fondo duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarFondoPensiones(req, res) {
	try {
		const { id } = req.params;
		await configuracionUsuariosService.eliminarFondoPensiones(parseInt(id));
		res.json({
			success: true,
			message: "Fondo de pensiones eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarFondoPensiones controller");
		
		if (error.message === "Fondo de pensiones no encontrado") {
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
	obtenerTiposIdentificacion,
	crearTipoIdentificacion,
	actualizarTipoIdentificacion,
	eliminarTipoIdentificacion,
	obtenerTiposContrato,
	crearTipoContrato,
	actualizarTipoContrato,
	eliminarTipoContrato,
	obtenerEstadosCiviles,
	crearEstadoCivil,
	actualizarEstadoCivil,
	eliminarEstadoCivil,
	obtenerArls,
	crearArl,
	actualizarArl,
	eliminarArl,
	obtenerEpss,
	crearEps,
	actualizarEps,
	eliminarEps,
	obtenerCajasCompensacion,
	crearCajaCompensacion,
	actualizarCajaCompensacion,
	eliminarCajaCompensacion,
	obtenerFondosPensiones,
	crearFondoPensiones,
	actualizarFondoPensiones,
	eliminarFondoPensiones
};

