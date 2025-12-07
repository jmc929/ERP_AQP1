const express = require("express");
const { healthRouter } = require("../modules/health");
const { comprasRouter } = require("../modules/compras");

const routes = express.Router();

routes.use("/health", healthRouter);
routes.use("/compras", comprasRouter);

module.exports = { routes };

