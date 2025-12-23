const express = require("express");
const { getHealth, testDatabase } = require("./health.controller");

const healthRoutes = express.Router();

healthRoutes.get("/", getHealth);
healthRoutes.get("/db", testDatabase);

module.exports = { healthRoutes };

