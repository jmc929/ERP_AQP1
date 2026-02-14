const cajasService = require("./cajas.service");
const { logger } = require("../../common/logger");

async function obtenerCajas(req, res) {
	try {
		const cajas = await cajasService.obtenerCajas();
		res.json({
			success: true,
			cajas: cajas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCajas controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerCajaPorId(req, res) {
	try {
		const { id } = req.params;
		const caja = await cajasService.obtenerCajaPorId(parseInt(id));
		res.json({
			success: true,
			caja: caja
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCajaPorId controller");
		
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

async function obtenerMovimientosCaja(req, res) {
	try {
		const { id } = req.params;
		const movimientos = await cajasService.obtenerMovimientosCaja(parseInt(id));
		res.json({
			success: true,
			movimientos: movimientos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerMovimientosCaja controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerHistorialCaja(req, res) {
	try {
		const { id } = req.params;
		const historial = await cajasService.obtenerHistorialCaja(parseInt(id));
		res.json({
			success: true,
			historial: historial
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerHistorialCaja controller");
		
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

async function obtenerTodosLosMovimientos(req, res) {
	try {
		const movimientos = await cajasService.obtenerTodosLosMovimientos();
		res.json({
			success: true,
			movimientos: movimientos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTodosLosMovimientos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerTiposMovimiento(req, res) {
	try {
		const tiposMovimiento = await cajasService.obtenerTiposMovimiento();
		res.json({
			success: true,
			tiposMovimiento: tiposMovimiento
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposMovimiento controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearMovimientoCaja(req, res) {
	try {
		const { id_caja, id_tipo_movimiento, monto, descripcion, observaciones, id_usuario } = req.body;

		// Validaciones
		if (!id_caja) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_caja es obligatorio"
			});
		}

		if (!id_tipo_movimiento) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_tipo_movimiento es obligatorio"
			});
		}

		if (!monto || parseFloat(monto) <= 0) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El monto es obligatorio y debe ser mayor a cero"
			});
		}

		if (!id_usuario) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_usuario es obligatorio"
			});
		}

		const movimiento = await cajasService.crearMovimientoCaja({
			id_caja: parseInt(id_caja),
			id_tipo_movimiento: parseInt(id_tipo_movimiento),
			monto: parseFloat(monto),
			descripcion: descripcion || null,
			observaciones: observaciones || null,
			id_usuario: parseInt(id_usuario)
		});

		res.status(201).json({
			success: true,
			message: "Movimiento de caja creado exitosamente",
			movimiento: movimiento
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearMovimientoCaja controller");
		
		if (error.message === "Caja no encontrada" || 
		    error.message === "Tipo de movimiento no encontrado" ||
		    error.message.includes("No se encontró el estado activo")) {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "El monto debe ser mayor a cero" ||
		    error.message === "El saldo de la caja no puede quedar negativo") {
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
	obtenerCajas,
	obtenerCajaPorId,
	obtenerMovimientosCaja,
	obtenerHistorialCaja,
	obtenerTodosLosMovimientos,
	obtenerTiposMovimiento,
	crearMovimientoCaja
};

