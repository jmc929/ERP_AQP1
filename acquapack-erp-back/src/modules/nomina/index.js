const express = require("express");
const { nominaRoutes } = require("./nomina.routes");

const nominaRouter = express.Router();

nominaRouter.use("/", nominaRoutes);

module.exports = { nominaRouter };

