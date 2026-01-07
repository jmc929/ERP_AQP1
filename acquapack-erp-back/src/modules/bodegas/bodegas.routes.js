const express = require("express");
const {
	obtenerBodegas,
	obtenerBodegaPorId,
	obtenerCatalogos,
	crearBodega,
	actualizarBodega,
	cambiarEstadoBodega,
	obtenerProductosPorBodega,
	realizarTraslado,
	obtenerMovimientosKardex
} = require("./bodegas.controller");

const bodegasRoutes = express.Router();

// Rutas para bodegas
// IMPORTANTE: Las rutas más específicas deben ir ANTES de las genéricas
// Rutas sin parámetros primero
bodegasRoutes.get("/catalogos", obtenerCatalogos);
bodegasRoutes.post("/traslado", realizarTraslado);
bodegasRoutes.get("/", obtenerBodegas);
bodegasRoutes.post("/", crearBodega);

// Rutas con sub-rutas específicas (más específicas primero)
bodegasRoutes.get("/:id/movimientos-kardex", obtenerMovimientosKardex);
bodegasRoutes.get("/:id/productos", obtenerProductosPorBodega);
bodegasRoutes.patch("/:id/estado", cambiarEstadoBodega);

// Rutas genéricas con parámetros al final
bodegasRoutes.get("/:id", obtenerBodegaPorId);
bodegasRoutes.put("/:id", actualizarBodega);

module.exports = { bodegasRoutes };

