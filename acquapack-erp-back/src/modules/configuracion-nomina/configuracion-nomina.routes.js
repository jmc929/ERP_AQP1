const express = require("express");
const {
	obtenerTiposHora,
	crearTipoHora,
	actualizarTipoHora,
	eliminarTipoHora,
	obtenerTiposDeduccion,
	crearTipoDeduccion,
	actualizarTipoDeduccion,
	eliminarTipoDeduccion,
	calcularAuxilioPorDias,
	obtenerValoresAuxilioTransporte,
	crearValorAuxilioTransporte,
	actualizarValorAuxilioTransporte,
	eliminarValorAuxilioTransporte
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

// Rutas para Valor Auxilio Transporte (calcular debe ir antes de :id)
configuracionNominaRoutes.get("/valor-auxilio-transporte/calcular", calcularAuxilioPorDias);
configuracionNominaRoutes.get("/valor-auxilio-transporte", obtenerValoresAuxilioTransporte);
configuracionNominaRoutes.post("/valor-auxilio-transporte", crearValorAuxilioTransporte);
configuracionNominaRoutes.put("/valor-auxilio-transporte/:id", actualizarValorAuxilioTransporte);
configuracionNominaRoutes.delete("/valor-auxilio-transporte/:id", eliminarValorAuxilioTransporte);

module.exports = { configuracionNominaRoutes };

