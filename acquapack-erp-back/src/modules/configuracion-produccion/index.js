const express = require("express");
const { configuracionProduccionRoutes } = require("./configuracion-produccion.routes");

const configuracionProduccionRouter = express.Router();

configuracionProduccionRouter.use("/", configuracionProduccionRoutes);

module.exports = { configuracionProduccionRouter };

