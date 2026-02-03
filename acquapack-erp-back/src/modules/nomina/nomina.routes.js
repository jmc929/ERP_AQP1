const express = require("express");
const {
	obtenerNominas,
	obtenerNominaPorId,
	crearNomina,
	obtenerTrabajadores,
	obtenerEstadosNomina,
	obtenerTiposHora,
	obtenerTiposDeduccion
} = require("./nomina.controller");

const nominaRoutes = express.Router();

nominaRoutes.get("/", obtenerNominas);
nominaRoutes.get("/trabajadores", obtenerTrabajadores);
nominaRoutes.get("/estados", obtenerEstadosNomina);
nominaRoutes.get("/tipos-hora", obtenerTiposHora);
nominaRoutes.get("/tipos-deduccion", obtenerTiposDeduccion);
nominaRoutes.get("/:id", obtenerNominaPorId);
nominaRoutes.post("/crear", crearNomina);

module.exports = { nominaRoutes };

