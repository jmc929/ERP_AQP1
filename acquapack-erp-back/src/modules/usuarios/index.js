const express = require("express");
const { usuariosRoutes } = require("./usuarios.routes");

const usuariosRouter = express.Router();

usuariosRouter.use("/", usuariosRoutes);

module.exports = { usuariosRouter };

