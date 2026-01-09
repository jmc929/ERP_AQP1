const express = require("express");
const {
	obtenerClientes,
	obtenerClientesPaginados,
	obtenerClientePorId,
	obtenerCatalogos,
	crearCliente,
	actualizarCliente,
	eliminarCliente,
	calcularDV
} = require("./clientes.controller");

const clientesRoutes = express.Router();

clientesRoutes.get("/catalogos", obtenerCatalogos);
clientesRoutes.get("/calcular-dv", calcularDV);
clientesRoutes.get("/paginados", obtenerClientesPaginados);
clientesRoutes.get("/", obtenerClientes);
clientesRoutes.get("/:id", obtenerClientePorId);
clientesRoutes.post("/", crearCliente);
clientesRoutes.put("/:id", actualizarCliente);
clientesRoutes.delete("/:id", eliminarCliente);

module.exports = { clientesRoutes };

