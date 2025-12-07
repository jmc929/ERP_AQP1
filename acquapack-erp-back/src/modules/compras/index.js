const express = require("express");
const { comprasRoutes } = require("./compras.routes");

const comprasRouter = express.Router();

comprasRouter.use("/", comprasRoutes);

module.exports = { comprasRouter };

