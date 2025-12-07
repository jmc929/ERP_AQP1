const express = require("express");
const { healthRoutes } = require("./health.routes");

const healthRouter = express.Router();

healthRouter.use("/", healthRoutes);

module.exports = { healthRouter };

