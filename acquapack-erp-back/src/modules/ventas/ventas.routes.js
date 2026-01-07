const express = require("express");
const {
  calcularValorTotal,
  obtenerSiguienteIdSalida,
  obtenerClientes,
  obtenerProductos,
  obtenerBodegas,
  obtenerIvas,
  obtenerRetenciones,
  crearSalida,
  obtenerSalidas,
  obtenerDetalleSalida
} = require("./ventas.controller");
const { logger } = require("../../common/logger");

const ventasRoutes = express.Router();

ventasRoutes.post("/calcular-valor-total", calcularValorTotal);
ventasRoutes.get("/siguiente-id-salida", obtenerSiguienteIdSalida);
ventasRoutes.get("/clientes", obtenerClientes);
ventasRoutes.get("/productos", obtenerProductos);
ventasRoutes.get("/bodegas", obtenerBodegas);
ventasRoutes.get("/ivas", obtenerIvas);
ventasRoutes.get("/retenciones", obtenerRetenciones);
ventasRoutes.post("/salidas", crearSalida);
ventasRoutes.get("/salidas", obtenerSalidas);
ventasRoutes.get("/salidas/:id", obtenerDetalleSalida);

logger.info("Rutas de ventas registradas: GET /salidas, GET /salidas/:id, POST /salidas");

module.exports = { ventasRoutes };

