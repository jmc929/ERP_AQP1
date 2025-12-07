const express = require("express");
const { calcularValorTotal } = require("./compras.controller");

const comprasRoutes = express.Router();

comprasRoutes.post("/calcular-valor-total", calcularValorTotal);

module.exports = { comprasRoutes };

