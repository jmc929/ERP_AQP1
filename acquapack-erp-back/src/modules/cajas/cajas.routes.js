const express = require("express");
const {
	obtenerCajas,
	obtenerCajaPorId,
	obtenerMovimientosCaja,
	obtenerHistorialCaja,
	obtenerTodosLosMovimientos,
	obtenerTiposMovimiento,
	crearMovimientoCaja
} = require("./cajas.controller");

const cajasRoutes = express.Router();

cajasRoutes.get("/", obtenerCajas);
cajasRoutes.get("/tipos-movimiento", obtenerTiposMovimiento);
cajasRoutes.post("/movimientos", crearMovimientoCaja);
cajasRoutes.get("/:id", obtenerCajaPorId);
cajasRoutes.get("/:id/movimientos", obtenerMovimientosCaja);
cajasRoutes.get("/:id/historial", obtenerHistorialCaja);
cajasRoutes.get("/movimientos/todos", obtenerTodosLosMovimientos);

module.exports = { cajasRoutes };

