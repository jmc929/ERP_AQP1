require("dotenv/config");

function parseCorsOrigins(value) {
	if (!value) return ["*"];
	return value.split(",").map((v) => v.trim());
}

const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: Number(process.env.PORT || 4000),
	CORS_ORIGIN: parseCorsOrigins(process.env.CORS_ORIGIN || "http://localhost:5173")
};

module.exports = { env };

