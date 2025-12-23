const express = require("express");
const { configuracionProductosRoutes } = require("./configuracion-productos.routes");

const configuracionProductosRouter = express.Router();

configuracionProductosRouter.use("/", configuracionProductosRoutes);

module.exports = { configuracionProductosRouter };

