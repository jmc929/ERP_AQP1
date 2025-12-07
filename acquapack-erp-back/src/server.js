const http = require("http");
const app = require("./app");
const { env } = require("./config/env");
const { logger } = require("./common/logger");

const server = http.createServer(app);

const PORT = env.PORT;

server.listen(PORT, () => {
	logger.info({ port: PORT, env: env.NODE_ENV }, "HTTP server listening");
});

process.on("uncaughtException", (error) => {
	logger.error({ err: error }, "Uncaught exception");
	process.exit(1);
});

process.on("unhandledRejection", (reason) => {
	logger.error({ err: reason }, "Unhandled promise rejection");
});

