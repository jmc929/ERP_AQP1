const express = require("express");
const {
	obtenerGrupos,
	crearGrupo,
	actualizarGrupo,
	eliminarGrupo,
	obtenerFamilias,
	crearFamilia,
	actualizarFamilia,
	eliminarFamilia,
	obtenerMedidas,
	crearMedida,
	actualizarMedida,
	eliminarMedida,
	generarPDFCodigosBarras
} = require("./configuracion-productos.controller");

const configuracionProductosRoutes = express.Router();

// Rutas para Grupos
configuracionProductosRoutes.get("/grupos", obtenerGrupos);
configuracionProductosRoutes.post("/grupos", crearGrupo);
configuracionProductosRoutes.put("/grupos/:id", actualizarGrupo);
configuracionProductosRoutes.delete("/grupos/:id", eliminarGrupo);

// Rutas para Familias
configuracionProductosRoutes.get("/familias", obtenerFamilias);
configuracionProductosRoutes.post("/familias", crearFamilia);
configuracionProductosRoutes.put("/familias/:id", actualizarFamilia);
configuracionProductosRoutes.delete("/familias/:id", eliminarFamilia);

// Rutas para Medidas
configuracionProductosRoutes.get("/medidas", obtenerMedidas);
configuracionProductosRoutes.post("/medidas", crearMedida);
configuracionProductosRoutes.put("/medidas/:id", actualizarMedida);
configuracionProductosRoutes.delete("/medidas/:id", eliminarMedida);

// Ruta para generar PDF de códigos de barras
configuracionProductosRoutes.post("/generar-pdf-codigos-barras", generarPDFCodigosBarras);

module.exports = { configuracionProductosRoutes };

