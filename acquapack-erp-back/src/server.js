const http = require("http");
const app = require("./app");
const { env } = require("./config/env");
const { logger } = require("./common/logger");
const { testConnection } = require("./config/db");

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

// Probar la conexión a la base de datos antes de iniciar el servidor
testConnection().then((connected) => {
	if (connected) {
		server.listen(PORT, '0.0.0.0', () => {
			logger.info({ port: PORT, env: env.NODE_ENV }, "HTTP server listening");
		});
	} else {
		logger.warn("El servidor se iniciará sin conexión a la base de datos");
		server.listen(PORT, '0.0.0.0', () => {
			logger.info({ port: PORT, env: env.NODE_ENV }, "HTTP server listening");
		});
	}
});

process.on("uncaughtException", (error) => {
	logger.error({ err: error }, "Uncaught exception");
	process.exit(1);
});

process.on("unhandledRejection", (reason) => {
	logger.error({ err: reason }, "Unhandled promise rejection");
});

