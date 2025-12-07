const { ZodError } = require("zod");
const { logger } = require("../logger");

function errorHandler(err, _req, res, _next) {
	if (err instanceof ZodError) {
		return res.status(400).json({ error: "ValidationError", issues: err.issues });
	}

	logger.error({ err }, "Unhandled error");
	return res.status(500).json({ error: "InternalServerError" });
}

module.exports = { errorHandler };

