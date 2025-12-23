const express = require("express");
const { login, testConnection } = require("./auth.controller");

const authRoutes = express.Router();

authRoutes.get("/test", testConnection);
authRoutes.post("/login", login);

module.exports = { authRoutes };

