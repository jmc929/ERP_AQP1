const express = require("express");
const {
	obtenerTiposHora,
	crearTipoHora,
	actualizarTipoHora,
	eliminarTipoHora,
	obtenerTiposDeduccion,
	crearTipoDeduccion,
	actualizarTipoDeduccion,
	eliminarTipoDeduccion
} = require("./configuracion-nomina.controller");

const configuracionNominaRoutes = express.Router();

// Rutas para Tipo Hora
configuracionNominaRoutes.get("/tipo-hora", obtenerTiposHora);
configuracionNominaRoutes.post("/tipo-hora", crearTipoHora);
configuracionNominaRoutes.put("/tipo-hora/:id", actualizarTipoHora);
configuracionNominaRoutes.delete("/tipo-hora/:id", eliminarTipoHora);

// Rutas para Tipo Deducción
configuracionNominaRoutes.get("/tipo-deduccion", obtenerTiposDeduccion);
configuracionNominaRoutes.post("/tipo-deduccion", crearTipoDeduccion);
configuracionNominaRoutes.put("/tipo-deduccion/:id", actualizarTipoDeduccion);
configuracionNominaRoutes.delete("/tipo-deduccion/:id", eliminarTipoDeduccion);

module.exports = { configuracionNominaRoutes };

