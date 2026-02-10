const express = require("express");
const { 
	crearUsuario, 
	obtenerCatalogos, 
	obtenerUsuarios, 
	obtenerUsuarioPorId,
	actualizarEstadoUsuario,
	actualizarUsuario,
	obtenerAlertasUsuarios
} = require("./usuarios.controller");

const usuariosRoutes = express.Router();

usuariosRoutes.get("/catalogos", obtenerCatalogos);
usuariosRoutes.get("/", obtenerUsuarios);
usuariosRoutes.get("/alertas", obtenerAlertasUsuarios);
usuariosRoutes.get("/:id", obtenerUsuarioPorId);
usuariosRoutes.post("/", crearUsuario);
usuariosRoutes.put("/:id", actualizarUsuario);
usuariosRoutes.patch("/:id/estado", actualizarEstadoUsuario);

module.exports = { usuariosRoutes };

