const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { routes } = require("./routes/index");
const { env } = require("./config/env");
const { notFoundHandler } = require("./common/middlewares/not-found");
const { errorHandler } = require("./common/middlewares/error-handler");

const app = express();

app.use(helmet());
// Configurar CORS para permitir múltiples orígenes
app.use(cors({ 
	origin: env.CORS_ORIGIN, // Puede ser un array o string
	credentials: true 
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
	res.json({ ok: true, service: "acquapack-erp-back", timestamp: new Date().toISOString() });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

