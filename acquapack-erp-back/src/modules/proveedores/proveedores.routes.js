const express = require("express");
const {
	obtenerProveedores,
	obtenerProveedorPorId,
	obtenerCatalogos,
	crearProveedor,
	actualizarProveedor,
	eliminarProveedor,
	calcularDV
} = require("./proveedores.controller");

const proveedoresRoutes = express.Router();

proveedoresRoutes.get("/catalogos", obtenerCatalogos);
proveedoresRoutes.get("/calcular-dv", calcularDV);
proveedoresRoutes.get("/", obtenerProveedores);
proveedoresRoutes.get("/:id", obtenerProveedorPorId);
proveedoresRoutes.post("/", crearProveedor);
proveedoresRoutes.put("/:id", actualizarProveedor);
proveedoresRoutes.delete("/:id", eliminarProveedor);

module.exports = { proveedoresRoutes };

