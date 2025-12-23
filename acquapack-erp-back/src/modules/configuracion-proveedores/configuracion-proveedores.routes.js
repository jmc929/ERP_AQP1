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
} = require("./configuracion-proveedores.controller");

const configuracionProveedoresRoutes = express.Router();

// Rutas para Tipo Entidad
configuracionProveedoresRoutes.get("/tipo-entidad", obtenerTiposEntidad);
configuracionProveedoresRoutes.post("/tipo-entidad", crearTipoEntidad);
configuracionProveedoresRoutes.put("/tipo-entidad/:id", actualizarTipoEntidad);
configuracionProveedoresRoutes.delete("/tipo-entidad/:id", eliminarTipoEntidad);

// Rutas para Ciudad
configuracionProveedoresRoutes.get("/ciudad", obtenerCiudades);
configuracionProveedoresRoutes.post("/ciudad", crearCiudad);
configuracionProveedoresRoutes.put("/ciudad/:id", actualizarCiudad);
configuracionProveedoresRoutes.delete("/ciudad/:id", eliminarCiudad);

// Rutas para Tipo Régimen IVA
configuracionProveedoresRoutes.get("/tipo-regimen-iva", obtenerTiposRegimenIva);
configuracionProveedoresRoutes.post("/tipo-regimen-iva", crearTipoRegimenIva);
configuracionProveedoresRoutes.put("/tipo-regimen-iva/:id", actualizarTipoRegimenIva);
configuracionProveedoresRoutes.delete("/tipo-regimen-iva/:id", eliminarTipoRegimenIva);

// Rutas para Responsabilidad Fiscal
configuracionProveedoresRoutes.get("/responsabilidad-fiscal", obtenerResponsabilidadesFiscales);
configuracionProveedoresRoutes.post("/responsabilidad-fiscal", crearResponsabilidadFiscal);
configuracionProveedoresRoutes.put("/responsabilidad-fiscal/:id", actualizarResponsabilidadFiscal);
configuracionProveedoresRoutes.delete("/responsabilidad-fiscal/:id", eliminarResponsabilidadFiscal);

module.exports = { configuracionProveedoresRoutes };


