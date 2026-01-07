const express = require("express");
const { ventasRoutes } = require("./ventas.routes");

const ventasRouter = express.Router();

ventasRouter.use("/", ventasRoutes);

module.exports = { ventasRouter };

