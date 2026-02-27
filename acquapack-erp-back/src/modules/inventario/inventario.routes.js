const express = require("express");
const { registrarAjuste } = require("./inventario.controller");

const inventarioRouter = express.Router();

inventarioRouter.post("/ajuste", registrarAjuste);

module.exports = { inventarioRouter };
