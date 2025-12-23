const express = require("express");
const {
	obtenerTiposEntidad,
	crearTipoEntidad,
	actualizarTipoEntidad,
	eliminarTipoEntidad,
	obtenerCiudades,
	crearCiudad,
	actualizarCiudad,
	eliminarCiudad,
	obtenerTiposRegimenIva,
	crearTipoRegimenIva,
	actualizarTipoRegimenIva,
	eliminarTipoRegimenIva,
	obtenerResponsabilidadesFiscales,
	crearResponsabilidadFiscal,
	actualizarResponsabilidadFiscal,
	eliminarResponsabilidadFiscal
} = require("./configuracion-clientes.controller");

const configuracionClientesRoutes = express.Router();

// Rutas para Tipo Entidad
configuracionClientesRoutes.get("/tipo-entidad", obtenerTiposEntidad);
configuracionClientesRoutes.post("/tipo-entidad", crearTipoEntidad);
configuracionClientesRoutes.put("/tipo-entidad/:id", actualizarTipoEntidad);
configuracionClientesRoutes.delete("/tipo-entidad/:id", eliminarTipoEntidad);

// Rutas para Ciudad
configuracionClientesRoutes.get("/ciudad", obtenerCiudades);
configuracionClientesRoutes.post("/ciudad", crearCiudad);
configuracionClientesRoutes.put("/ciudad/:id", actualizarCiudad);
configuracionClientesRoutes.delete("/ciudad/:id", eliminarCiudad);

// Rutas para Tipo Régimen IVA
configuracionClientesRoutes.get("/tipo-regimen-iva", obtenerTiposRegimenIva);
configuracionClientesRoutes.post("/tipo-regimen-iva", crearTipoRegimenIva);
configuracionClientesRoutes.put("/tipo-regimen-iva/:id", actualizarTipoRegimenIva);
configuracionClientesRoutes.delete("/tipo-regimen-iva/:id", eliminarTipoRegimenIva);

// Rutas para Responsabilidad Fiscal
configuracionClientesRoutes.get("/responsabilidad-fiscal", obtenerResponsabilidadesFiscales);
configuracionClientesRoutes.post("/responsabilidad-fiscal", crearResponsabilidadFiscal);
configuracionClientesRoutes.put("/responsabilidad-fiscal/:id", actualizarResponsabilidadFiscal);
configuracionClientesRoutes.delete("/responsabilidad-fiscal/:id", eliminarResponsabilidadFiscal);

module.exports = { configuracionClientesRoutes };

