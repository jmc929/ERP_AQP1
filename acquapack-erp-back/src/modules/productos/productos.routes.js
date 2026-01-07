const express = require("express");
const { 
	obtenerProductos, 
	obtenerCatalogos,
	obtenerSiguienteCodigoBarras,
	obtenerProductoPorId,
	actualizarProducto,
	crearProducto,
	obtenerCostosPorProductos
} = require("./productos.controller");

const productosRoutes = express.Router();

productosRoutes.get("/catalogos", obtenerCatalogos);
productosRoutes.get("/siguiente-codigo-barras", obtenerSiguienteCodigoBarras);
productosRoutes.get("/costos", obtenerCostosPorProductos);
productosRoutes.get("/:id", obtenerProductoPorId);
productosRoutes.get("/", obtenerProductos);
productosRoutes.put("/:id", actualizarProducto);
productosRoutes.post("/", crearProducto);

module.exports = { productosRoutes };

