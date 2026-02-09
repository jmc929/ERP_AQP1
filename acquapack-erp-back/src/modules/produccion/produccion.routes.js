const express = require("express");
const {
	obtenerTurnos,
	obtenerMedidas,
	obtenerMaquinas,
	obtenerProductos,
	obtenerUsuarios,
	obtenerCatalogos,
	determinarTurno,
	crearProduccion,
	obtenerProducciones,
	obtenerProduccionesFiltradas,
	obtenerProduccionPorId
} = require("./produccion.controller");

const produccionRoutes = express.Router();

// Catálogos
produccionRoutes.get("/turnos", obtenerTurnos);
produccionRoutes.get("/turno-actual", determinarTurno);
produccionRoutes.get("/medidas", obtenerMedidas);
produccionRoutes.get("/maquinas", obtenerMaquinas);
produccionRoutes.get("/productos", obtenerProductos);
produccionRoutes.get("/usuarios", obtenerUsuarios);
produccionRoutes.get("/catalogos", obtenerCatalogos);

// Producciones
produccionRoutes.post("/", crearProduccion);
produccionRoutes.get("/filtradas", obtenerProduccionesFiltradas);
produccionRoutes.get("/", obtenerProducciones);
produccionRoutes.get("/:id", obtenerProduccionPorId);

module.exports = { produccionRoutes };

