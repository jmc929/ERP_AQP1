const express = require("express");
const {
	obtenerBodegas,
	obtenerBodegaPorId,
	obtenerCatalogos,
	crearBodega,
	actualizarBodega,
	cambiarEstadoBodega,
	obtenerProductosPorBodega,
	realizarTraslado
} = require("./bodegas.controller");

const bodegasRoutes = express.Router();

// Rutas para bodegas
bodegasRoutes.get("/catalogos", obtenerCatalogos);
bodegasRoutes.post("/traslado", realizarTraslado);
bodegasRoutes.get("/:id/productos", obtenerProductosPorBodega);
bodegasRoutes.get("/", obtenerBodegas);
bodegasRoutes.get("/:id", obtenerBodegaPorId);
bodegasRoutes.post("/", crearBodega);
bodegasRoutes.put("/:id", actualizarBodega);
bodegasRoutes.patch("/:id/estado", cambiarEstadoBodega);

module.exports = { bodegasRoutes };

