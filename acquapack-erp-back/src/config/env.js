require("dotenv/config");

function parseCorsOrigins(value) {
	if (!value) {
		// En desarrollo, permitir ambos puertos comunes de Vite
		if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
			return ["http://localhost:5173", "http://localhost:8080"];
		}
		return ["*"];
	}
	return value.split(",").map((v) => v.trim());
}

const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: Number(process.env.PORT || 4000),
	CORS_ORIGIN: parseCorsOrigins(process.env.CORS_ORIGIN),
	DB_HOST: process.env.DB_HOST || "100.77.172.10",
	//DB_HOST_LOCAL: process.env.DB_HOST_LOCAL || "localhost",
	DB_PORT: Number(process.env.DB_PORT || 5432),
	DB_NAME: process.env.DB_NAME || "ERP_ACQ",
	DB_USER: process.env.DB_USER || "postgres",
	DB_PASSWORD: process.env.DB_PASSWORD || "1478"
};

module.exports = { env };

