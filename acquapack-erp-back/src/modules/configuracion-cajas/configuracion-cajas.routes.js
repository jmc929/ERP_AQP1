const express = require("express");
const {
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
} = require("./configuracion-cajas.controller");

const configuracionCajasRoutes = express.Router();

// Rutas para Tipo Movimiento
configuracionCajasRoutes.get("/tipo-movimiento", obtenerTiposMovimiento);
configuracionCajasRoutes.post("/tipo-movimiento", crearTipoMovimiento);
configuracionCajasRoutes.put("/tipo-movimiento/:id", actualizarTipoMovimiento);
configuracionCajasRoutes.delete("/tipo-movimiento/:id", eliminarTipoMovimiento);

// Rutas para Cajas
configuracionCajasRoutes.get("/cajas", obtenerCajas);
configuracionCajasRoutes.post("/cajas", crearCaja);
configuracionCajasRoutes.put("/cajas/:id", actualizarCaja);
configuracionCajasRoutes.patch("/cajas/:id/archivar", archivarCaja);
configuracionCajasRoutes.patch("/cajas/:id/desarchivar", desarchivarCaja);

// Rutas para Estados
configuracionCajasRoutes.get("/estados", obtenerEstados);

module.exports = { configuracionCajasRoutes };

