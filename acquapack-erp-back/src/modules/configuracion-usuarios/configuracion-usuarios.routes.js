const express = require("express");
const {
	obtenerTiposIdentificacion,
	crearTipoIdentificacion,
	actualizarTipoIdentificacion,
	eliminarTipoIdentificacion,
	obtenerTiposContrato,
	crearTipoContrato,
	actualizarTipoContrato,
	eliminarTipoContrato,
	obtenerEstadosCiviles,
	crearEstadoCivil,
	actualizarEstadoCivil,
	eliminarEstadoCivil,
	obtenerArls,
	crearArl,
	actualizarArl,
	eliminarArl,
	obtenerEpss,
	crearEps,
	actualizarEps,
	eliminarEps,
	obtenerCajasCompensacion,
	crearCajaCompensacion,
	actualizarCajaCompensacion,
	eliminarCajaCompensacion,
	obtenerFondosPensiones,
	crearFondoPensiones,
	actualizarFondoPensiones,
	eliminarFondoPensiones,
	obtenerRoles,
	crearRol,
	actualizarRol,
	eliminarRol
} = require("./configuracion-usuarios.controller");

const configuracionUsuariosRoutes = express.Router();

// Rutas para Tipo Identificación
configuracionUsuariosRoutes.get("/tipo-identificacion", obtenerTiposIdentificacion);
configuracionUsuariosRoutes.post("/tipo-identificacion", crearTipoIdentificacion);
configuracionUsuariosRoutes.put("/tipo-identificacion/:id", actualizarTipoIdentificacion);
configuracionUsuariosRoutes.delete("/tipo-identificacion/:id", eliminarTipoIdentificacion);

// Rutas para Tipo Contrato
configuracionUsuariosRoutes.get("/tipo-contrato", obtenerTiposContrato);
configuracionUsuariosRoutes.post("/tipo-contrato", crearTipoContrato);
configuracionUsuariosRoutes.put("/tipo-contrato/:id", actualizarTipoContrato);
configuracionUsuariosRoutes.delete("/tipo-contrato/:id", eliminarTipoContrato);

// Rutas para Estado Civil
configuracionUsuariosRoutes.get("/estado-civil", obtenerEstadosCiviles);
configuracionUsuariosRoutes.post("/estado-civil", crearEstadoCivil);
configuracionUsuariosRoutes.put("/estado-civil/:id", actualizarEstadoCivil);
configuracionUsuariosRoutes.delete("/estado-civil/:id", eliminarEstadoCivil);

// Rutas para ARL
configuracionUsuariosRoutes.get("/arl", obtenerArls);
configuracionUsuariosRoutes.post("/arl", crearArl);
configuracionUsuariosRoutes.put("/arl/:id", actualizarArl);
configuracionUsuariosRoutes.delete("/arl/:id", eliminarArl);

// Rutas para EPS
configuracionUsuariosRoutes.get("/eps", obtenerEpss);
configuracionUsuariosRoutes.post("/eps", crearEps);
configuracionUsuariosRoutes.put("/eps/:id", actualizarEps);
configuracionUsuariosRoutes.delete("/eps/:id", eliminarEps);

// Rutas para Caja Compensación
configuracionUsuariosRoutes.get("/caja-compensacion", obtenerCajasCompensacion);
configuracionUsuariosRoutes.post("/caja-compensacion", crearCajaCompensacion);
configuracionUsuariosRoutes.put("/caja-compensacion/:id", actualizarCajaCompensacion);
configuracionUsuariosRoutes.delete("/caja-compensacion/:id", eliminarCajaCompensacion);

// Rutas para Fondo Pensiones
configuracionUsuariosRoutes.get("/fondo-pensiones", obtenerFondosPensiones);
configuracionUsuariosRoutes.post("/fondo-pensiones", crearFondoPensiones);
configuracionUsuariosRoutes.put("/fondo-pensiones/:id", actualizarFondoPensiones);
configuracionUsuariosRoutes.delete("/fondo-pensiones/:id", eliminarFondoPensiones);

// Rutas para Roles
configuracionUsuariosRoutes.get("/rol", obtenerRoles);
configuracionUsuariosRoutes.post("/rol", crearRol);
configuracionUsuariosRoutes.put("/rol/:id", actualizarRol);
configuracionUsuariosRoutes.delete("/rol/:id", eliminarRol);

module.exports = { configuracionUsuariosRoutes };

