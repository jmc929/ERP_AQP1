const { Pool } = require("pg");
const { env } = require("./env");
const { logger } = require("../common/logger");

// Log de configuración (sin mostrar la contraseña completa por seguridad)
logger.info({
	dbHost: env.DB_HOST,
	dbPort: env.DB_PORT,
	dbName: env.DB_NAME,
	dbUser: env.DB_USER,
	passwordSet: !!env.DB_PASSWORD
}, "Configuración de base de datos cargada");

// Crear el pool de conexiones
const pool = new Pool({
	host: env.DB_HOST,
	port: env.DB_PORT,
	database: env.DB_NAME,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	max: 20, // Máximo número de clientes en el pool
	idleTimeoutMillis: 30000, // Cerrar clientes inactivos después de 30 segundos
	connectionTimeoutMillis: 2000, // Timeout para obtener una conexión del pool
});

// Manejar errores del pool
pool.on("error", (err, client) => {
	logger.error({ err, client }, "Error inesperado en el pool de PostgreSQL");
});

// Función para probar la conexión
async function testConnection() {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT NOW()");
		client.release();
		logger.info({ time: result.rows[0].now }, "Conexión a PostgreSQL establecida correctamente");
		return true;
	} catch (error) {
		logger.error({ err: error }, "Error al conectar con PostgreSQL");
		return false;
	}
}

// Función para cerrar el pool (útil para tests o shutdown graceful)
async function closePool() {
	try {
		await pool.end();
		logger.info("Pool de PostgreSQL cerrado correctamente");
	} catch (error) {
		logger.error({ err: error }, "Error al cerrar el pool de PostgreSQL");
	}
}

module.exports = {
	pool,
	testConnection,
	closePool,
};

