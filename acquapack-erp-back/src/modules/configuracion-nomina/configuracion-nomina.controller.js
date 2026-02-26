const configuracionNominaService = require("./configuracion-nomina.service");
const { logger } = require("../../common/logger");

// ========== TIPO HORA ==========

async function obtenerTiposHora(req, res) {
	try {
		const tiposHora = await configuracionNominaService.obtenerTiposHora();
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

async function crearTipoHora(req, res) {
	try {
		const { nombre, horario, recargo, valor_hora, id_estado } = req.body;

		if (!nombre) {
			return res.status(400).json({
				success: false,
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipoHora = await configuracionNominaService.crearTipoHora({
			nombre,
			horario,
			recargo,
			valor_hora,
			id_estado
		});

		res.status(201).json({
			success: true,
			message: "Tipo de hora creado exitosamente",
			tipoHora
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoHora controller");
		
		if (error.message === "Ya existe un tipo de hora con este nombre") {
			return res.status(409).json({
				success: false,
				error: "Tipo de hora duplicado",
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

async function actualizarTipoHora(req, res) {
	try {
		const { id } = req.params;
		const datosTipoHora = req.body;

		const tipoHora = await configuracionNominaService.actualizarTipoHora(parseInt(id), datosTipoHora);
		res.json({
			success: true,
			message: "Tipo de hora actualizado exitosamente",
			tipoHora
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoHora controller");
		
		if (error.message === "Tipo de hora no encontrado" || error.message === "Ya existe otro tipo de hora con este nombre") {
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

async function eliminarTipoHora(req, res) {
	try {
		const { id } = req.params;
		await configuracionNominaService.eliminarTipoHora(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de hora eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoHora controller");
		
		if (error.message === "Tipo de hora no encontrado") {
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

// ========== TIPO DEDUCCION ==========

async function obtenerTiposDeduccion(req, res) {
	try {
		const tiposDeduccion = await configuracionNominaService.obtenerTiposDeduccion();
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

async function crearTipoDeduccion(req, res) {
	try {
		const { nombre, descripcion, id_estado } = req.body;

		if (!nombre) {
			return res.status(400).json({
				success: false,
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipoDeduccion = await configuracionNominaService.crearTipoDeduccion({
			nombre,
			descripcion,
			id_estado
		});

		res.status(201).json({
			success: true,
			message: "Tipo de deducción creado exitosamente",
			tipoDeduccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoDeduccion controller");
		
		if (error.message === "Ya existe un tipo de deducción con este nombre") {
			return res.status(409).json({
				success: false,
				error: "Tipo de deducción duplicado",
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

async function actualizarTipoDeduccion(req, res) {
	try {
		const { id } = req.params;
		const datosTipoDeduccion = req.body;

		const tipoDeduccion = await configuracionNominaService.actualizarTipoDeduccion(parseInt(id), datosTipoDeduccion);
		res.json({
			success: true,
			message: "Tipo de deducción actualizado exitosamente",
			tipoDeduccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoDeduccion controller");
		
		if (error.message === "Tipo de deducción no encontrado" || error.message === "Ya existe otro tipo de deducción con este nombre") {
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

async function eliminarTipoDeduccion(req, res) {
	try {
		const { id } = req.params;
		await configuracionNominaService.eliminarTipoDeduccion(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de deducción eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoDeduccion controller");
		
		if (error.message === "Tipo de deducción no encontrado") {
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

// ========== VALOR AUXILIO TRANSPORTE ==========

async function calcularAuxilioPorDias(req, res) {
	try {
		const dias = parseInt(req.query.dias, 10) || 0;
		const resultado = await configuracionNominaService.calcularAuxilioPorDias(dias);
		res.json({
			success: true,
			...resultado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en calcularAuxilioPorDias controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerValoresAuxilioTransporte(req, res) {
	try {
		const valores = await configuracionNominaService.obtenerValoresAuxilioTransporte();
		res.json({
			success: true,
			valoresAuxilioTransporte: valores
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerValoresAuxilioTransporte controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearValorAuxilioTransporte(req, res) {
	try {
		const { nombre, valor } = req.body;
		const registro = await configuracionNominaService.crearValorAuxilioTransporte({
			nombre: nombre || null,
			valor
		});
		res.status(201).json({
			success: true,
			message: "Valor de auxilio de transporte creado exitosamente",
			valorAuxilioTransporte: registro
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearValorAuxilioTransporte controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarValorAuxilioTransporte(req, res) {
	try {
		const { id } = req.params;
		const datos = req.body;
		const registro = await configuracionNominaService.actualizarValorAuxilioTransporte(parseInt(id), datos);
		res.json({
			success: true,
			message: "Valor de auxilio de transporte actualizado exitosamente",
			valorAuxilioTransporte: registro
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarValorAuxilioTransporte controller");
		if (error.message === "Valor de auxilio de transporte no encontrado") {
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

async function eliminarValorAuxilioTransporte(req, res) {
	try {
		const { id } = req.params;
		await configuracionNominaService.eliminarValorAuxilioTransporte(parseInt(id));
		res.json({
			success: true,
			message: "Valor de auxilio de transporte eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarValorAuxilioTransporte controller");
		if (error.message === "Valor de auxilio de transporte no encontrado") {
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
	obtenerTiposHora,
	crearTipoHora,
	actualizarTipoHora,
	eliminarTipoHora,
	obtenerTiposDeduccion,
	crearTipoDeduccion,
	actualizarTipoDeduccion,
	eliminarTipoDeduccion,
	calcularAuxilioPorDias,
	obtenerValoresAuxilioTransporte,
	crearValorAuxilioTransporte,
	actualizarValorAuxilioTransporte,
	eliminarValorAuxilioTransporte
};

