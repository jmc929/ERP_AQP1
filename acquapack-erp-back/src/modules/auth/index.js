const express = require("express");
const { authRoutes } = require("./auth.routes");

const authRouter = express.Router();

authRouter.use("/", authRoutes);

module.exports = { authRouter };

