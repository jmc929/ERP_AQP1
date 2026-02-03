const express = require("express");
const {
	obtenerNotasPorUsuario,
	obtenerTodasLasNotas,
	obtenerNotaPorId,
	crearNota,
	actualizarNota,
	eliminarNota
} = require("./notas.controller");

const notasRoutes = express.Router();

notasRoutes.get("/", obtenerTodasLasNotas);
notasRoutes.get("/usuario/:idUsuario", obtenerNotasPorUsuario);
notasRoutes.get("/:id", obtenerNotaPorId);
notasRoutes.post("/", crearNota);
notasRoutes.put("/:id", actualizarNota);
notasRoutes.delete("/:id", eliminarNota);

module.exports = { notasRoutes };

