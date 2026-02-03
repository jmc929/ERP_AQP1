const express = require("express");
const { configuracionNominaRoutes } = require("./configuracion-nomina.routes");

const configuracionNominaRouter = express.Router();

configuracionNominaRouter.use("/", configuracionNominaRoutes);

module.exports = { configuracionNominaRouter };

