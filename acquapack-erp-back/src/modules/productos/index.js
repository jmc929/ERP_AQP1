const express = require("express");
const { productosRoutes } = require("./productos.routes");

const productosRouter = express.Router();

productosRouter.use("/", productosRoutes);

module.exports = { productosRouter };

