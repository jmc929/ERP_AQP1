const { pool } = require("../../config/db");

async function getHealth(req, res) {
	try {
		// Probar la conexión a la base de datos
		const client = await pool.connect();
		await client.query("SELECT 1");
		client.release();

		res.json({
			status: "ok",
			service: "acquapack-erp-back",
			database: "connected",
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		res.status(503).json({
			status: "error",
			service: "acquapack-erp-back",
			database: "disconnected",
			error: error.message,
			timestamp: new Date().toISOString()
		});
	}
}

async function testDatabase(req, res) {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT NOW() as current_time, version() as pg_version");
		client.release();

		res.json({
			status: "ok",
			database: {
				connected: true,
				currentTime: result.rows[0].current_time,
				version: result.rows[0].pg_version
			}
		});
	} catch (error) {
		res.status(503).json({
			status: "error",
			database: {
				connected: false,
				error: error.message
			}
		});
	}
}

module.exports = { getHealth, testDatabase };

