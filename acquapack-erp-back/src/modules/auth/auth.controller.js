const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

// Endpoint de prueba para verificar la conexión y estructura de la tabla
async function testConnection(req, res) {
	try {
		// Probar conexión básica
		const testQuery = await pool.query("SELECT NOW() as current_time");
		
		// Intentar obtener la estructura de la tabla usuarios
		let tableStructure = null;
		let sampleData = null;
		
		try {
			// Obtener estructura de la tabla usuarios
			const structureQuery = `
				SELECT column_name, data_type, character_maximum_length
				FROM information_schema.columns
				WHERE table_name = 'usuarios'
				ORDER BY ordinal_position;
			`;
			const structureResult = await pool.query(structureQuery);
			tableStructure = structureResult.rows;
			
			// Obtener algunos datos de ejemplo (sin contraseñas)
			// Excluir password y campos sensibles
			const excludedColumns = ['password'];
			const availableColumns = structureResult.rows
				.map(col => col.column_name)
				.filter(col => !excludedColumns.includes(col.toLowerCase()));
			
			// Construir la consulta dinámicamente con las columnas disponibles
			if (availableColumns.length > 0) {
				const columnsList = availableColumns.map(col => `"${col}"`).join(', ');
				const sampleQuery = `SELECT ${columnsList} FROM usuarios LIMIT 5`;
				const sampleResult = await pool.query(sampleQuery);
				sampleData = sampleResult.rows;
			}
			
			// También obtener información sobre la tabla de roles
			const rolesQuery = `
				SELECT 
					u.id_usuarios,
					u.documento,
					u.nombre,
					COALESCE(
						json_agg(
							json_build_object(
								'id_rol', r.id_rol,
								'nombre_rol', r.nombre
							)
						) FILTER (WHERE r.id_rol IS NOT NULL),
						'[]'::json
					) as roles
				FROM usuarios u
				LEFT JOIN usuarios_x_rol uxr ON u.id_usuarios = uxr.id_usuarios
				LEFT JOIN rol r ON uxr.id_rol = r.id_rol
				GROUP BY u.id_usuarios, u.documento, u.nombre
				LIMIT 3
			`;
			const rolesResult = await pool.query(rolesQuery);
			if (rolesResult.rows.length > 0) {
				sampleData = rolesResult.rows;
			}
		} catch (tableError) {
			logger.warn({ err: tableError }, "Error al consultar tabla usuarios");
		}
		
		res.json({
			success: true,
			database: {
				connected: true,
				currentTime: testQuery.rows[0].current_time
			},
			table: {
				exists: tableStructure !== null,
				structure: tableStructure,
				sampleData: sampleData
			}
		});
	} catch (error) {
		logger.error({ err: error }, "Error al probar conexión");
		res.status(500).json({
			success: false,
			error: error.message,
			database: {
				connected: false
			}
		});
	}
}

async function login(req, res) {
	try {
		const { documento, password } = req.body;

		// Validar que se envíen los campos requeridos
		if (!documento || !password) {
			return res.status(400).json({
				error: "Campos requeridos faltantes",
				message: "El documento y la contraseña son obligatorios"
			});
		}

		// Consultar el usuario en la base de datos con sus roles
		logger.info({ documento }, "Intentando autenticar usuario");
		
		const query = `
			SELECT 
				u.id_usuarios,
				u.documento,
				u.nombre,
				u.apellido,
				u.correo_electronico,
				u.id_estado,
				COALESCE(
					json_agg(
						json_build_object(
							'id_rol', r.id_rol,
							'nombre_rol', r.nombre
						)
					) FILTER (WHERE r.id_rol IS NOT NULL),
					'[]'::json
				) as roles
			FROM usuarios u
			LEFT JOIN usuarios_x_rol uxr ON u.id_usuarios = uxr.id_usuarios
			LEFT JOIN rol r ON uxr.id_rol = r.id_rol
			WHERE u.documento = $1 AND u.password = $2
			GROUP BY u.id_usuarios, u.documento, u.nombre, u.apellido, u.correo_electronico, u.id_estado
		`;
		
		const result = await pool.query(query, [documento, password]);

		logger.info({ 
			documento, 
			rowsFound: result.rows.length 
		}, "Resultado de consulta de login");

		// Verificar si se encontró el usuario
		if (result.rows.length === 0) {
			logger.warn({ documento }, "Intento de login fallido - credenciales inválidas");
			return res.status(401).json({
				error: "Credenciales inválidas",
				message: "El documento o la contraseña son incorrectos"
			});
		}

		const usuario = result.rows[0];

		// Convertir roles de JSON a array si es necesario
		if (typeof usuario.roles === 'string') {
			usuario.roles = JSON.parse(usuario.roles);
		}

		logger.info({ documento, usuarioId: usuario.id_usuarios }, "Usuario autenticado exitosamente");

		res.json({
			success: true,
			message: "Login exitoso",
			usuario: usuario
		});

	} catch (error) {
		logger.error({ err: error }, "Error al realizar login");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = { login, testConnection };

