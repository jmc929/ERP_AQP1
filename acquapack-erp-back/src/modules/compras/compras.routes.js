const express = require("express");
const {
  calcularValorTotal,
  obtenerSiguienteIdFactura,
  obtenerProveedores,
  obtenerProductos,
  obtenerBodegas,
  obtenerIvas,
  obtenerRetenciones,
  crearFactura,
  obtenerFacturas,
  obtenerDetalleFactura,
  obtenerProductosXProveedor
} = require("./compras.controller");
const { logger } = require("../../common/logger");

const comprasRoutes = express.Router();

comprasRoutes.post("/calcular-valor-total", calcularValorTotal);
comprasRoutes.get("/siguiente-id-factura", obtenerSiguienteIdFactura);
comprasRoutes.get("/proveedores", obtenerProveedores);
comprasRoutes.get("/productos", obtenerProductos);
comprasRoutes.get("/bodegas", obtenerBodegas);
comprasRoutes.get("/ivas", obtenerIvas);
comprasRoutes.get("/retenciones", obtenerRetenciones);
comprasRoutes.post("/facturas", crearFactura);
comprasRoutes.get("/facturas", obtenerFacturas);
comprasRoutes.get("/facturas/:id", obtenerDetalleFactura);
comprasRoutes.get("/productos-x-proveedor", obtenerProductosXProveedor);

logger.info("Rutas de compras registradas: GET /facturas, GET /facturas/:id, GET /productos-x-proveedor");

module.exports = { comprasRoutes };

