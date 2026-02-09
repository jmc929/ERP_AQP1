const express = require("express");
const { produccionRoutes } = require("./produccion.routes");

const produccionRouter = express.Router();

produccionRouter.use("/", produccionRoutes);

module.exports = { produccionRouter };

