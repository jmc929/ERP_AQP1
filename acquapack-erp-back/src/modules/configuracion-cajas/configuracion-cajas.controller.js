const configuracionCajasService = require("./configuracion-cajas.service");
const { logger } = require("../../common/logger");

// ========== TIPO MOVIMIENTO ==========

async function obtenerTiposMovimiento(req, res) {
	try {
		const tiposMovimiento = await configuracionCajasService.obtenerTiposMovimiento();
		res.json({
			success: true,
			tiposMovimiento
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposMovimiento controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearTipoMovimiento(req, res) {
	try {
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipoMovimiento = await configuracionCajasService.crearTipoMovimiento({ nombre });
		res.status(201).json({
			success: true,
			message: "Tipo de movimiento creado exitosamente",
			tipoMovimiento
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearTipoMovimiento controller");
		
		if (error.message === "Ya existe un tipo de movimiento con este nombre") {
			return res.status(409).json({
				error: "Tipo de movimiento duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarTipoMovimiento(req, res) {
	try {
		const { id } = req.params;
		const { nombre } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const tipoMovimiento = await configuracionCajasService.actualizarTipoMovimiento(parseInt(id), { nombre });
		res.json({
			success: true,
			message: "Tipo de movimiento actualizado exitosamente",
			tipoMovimiento
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarTipoMovimiento controller");
		
		if (error.message === "Tipo de movimiento no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro tipo de movimiento con este nombre") {
			return res.status(409).json({
				error: "Tipo de movimiento duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function eliminarTipoMovimiento(req, res) {
	try {
		const { id } = req.params;
		await configuracionCajasService.eliminarTipoMovimiento(parseInt(id));
		res.json({
			success: true,
			message: "Tipo de movimiento eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarTipoMovimiento controller");
		
		if (error.message === "Tipo de movimiento no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message.includes("movimientos asociados")) {
			return res.status(400).json({
				error: "No se puede eliminar",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

// ========== CAJAS ==========

async function obtenerCajas(req, res) {
	try {
		const cajas = await configuracionCajasService.obtenerCajas();
		res.json({
			success: true,
			cajas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCajas controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearCaja(req, res) {
	try {
		const { nombre, descripcion, saldo_actual, id_estado } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		if (!id_estado) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_estado es obligatorio"
			});
		}

		const caja = await configuracionCajasService.crearCaja({
			nombre,
			descripcion,
			saldo_actual,
			id_estado
		});
		res.status(201).json({
			success: true,
			message: "Caja creada exitosamente",
			caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearCaja controller");
		
		if (error.message === "Ya existe una caja con este nombre") {
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

async function actualizarCaja(req, res) {
	try {
		const { id } = req.params;
		const { nombre, descripcion, saldo_actual } = req.body;

		const caja = await configuracionCajasService.actualizarCaja(parseInt(id), {
			nombre,
			descripcion,
			saldo_actual
		});
		res.json({
			success: true,
			message: "Caja actualizada exitosamente",
			caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarCaja controller");
		
		if (error.message === "Caja no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra caja con este nombre") {
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

async function archivarCaja(req, res) {
	try {
		const { id } = req.params;
		const { id_estado } = req.body;

		if (!id_estado) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_estado es obligatorio"
			});
		}

		const caja = await configuracionCajasService.archivarCaja(parseInt(id), parseInt(id_estado));
		res.json({
			success: true,
			message: "Caja archivada exitosamente",
			caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en archivarCaja controller");
		
		if (error.message === "Caja no encontrada") {
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

async function desarchivarCaja(req, res) {
	try {
		const { id } = req.params;

		const caja = await configuracionCajasService.desarchivarCaja(parseInt(id));
		res.json({
			success: true,
			message: "Caja desarchivada exitosamente",
			caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en desarchivarCaja controller");
		
		if (error.message === "Caja no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message.includes("No se encontró el estado 'Activo'")) {
			return res.status(400).json({
				error: "Estado no encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerEstados(req, res) {
	try {
		const estados = await configuracionCajasService.obtenerEstados();
		res.json({
			success: true,
			estados
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerEstados controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerTiposMovimiento,
	crearTipoMovimiento,
	actualizarTipoMovimiento,
	eliminarTipoMovimiento,
	obtenerCajas,
	crearCaja,
	actualizarCaja,
	archivarCaja,
	desarchivarCaja,
	obtenerEstados
};

