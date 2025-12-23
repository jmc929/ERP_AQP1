const express = require("express");
const {
	obtenerTareas,
	obtenerTareasPorUsuario,
	crearTarea,
	actualizarTarea,
	eliminarTarea
} = require("./tareas.controller");

const tareasRoutes = express.Router();

tareasRoutes.get("/", obtenerTareas);
tareasRoutes.get("/usuario/:idUsuario", obtenerTareasPorUsuario);
tareasRoutes.post("/", crearTarea);
tareasRoutes.put("/:id", actualizarTarea);
tareasRoutes.delete("/:id", eliminarTarea);

module.exports = { tareasRoutes };

