const { PrismaClient } = require("../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { pool } = require("./db");
const { logger } = require("../common/logger");

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
	adapter,
	log: [
		{ level: "query", emit: "event" },
		{ level: "info", emit: "stdout" },
		{ level: "warn", emit: "stdout" },
		{ level: "error", emit: "stdout" },
	],
});

prisma.$on("query", (e) => {
	logger.debug({ query: e.query, params: e.params, duration: `${e.duration}ms` }, "Prisma Query");
});

module.exports = { prisma };
