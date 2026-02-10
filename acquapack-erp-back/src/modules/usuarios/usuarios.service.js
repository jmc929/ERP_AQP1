const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con usuarios
 */
class UsuariosService {
	/**
	 * Obtiene el ID del estado "Activo" desde la base de datos
	 * @returns {Promise<number>} ID del estado activo
	 */
	async obtenerIdEstadoActivo() {
		try {
			const result = await pool.query(
				"SELECT id_estado FROM public.estado WHERE nombre ILIKE 'activo' AND modulo = 'usuarios' LIMIT 1"
			);
			if (result.rows.length === 0) {
				logger.warn("No se encontró estado 'Activo' para usuarios, usando null");
				return null;
			}
			return result.rows[0].id_estado;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener ID de estado activo");
			return null;
		}
	}

	/**
	 * Crea un nuevo usuario en la base de datos
	 * @param {Object} datosUsuario - Datos del usuario a crear
	 * @returns {Promise<Object>} Usuario creado
	 */
	async crearUsuario(datosUsuario) {
		const client = await pool.connect();
		
		try {
			await client.query("BEGIN");

			// Validar que el documento no exista
			const documentoExistente = await client.query(
				"SELECT id_usuarios FROM usuarios WHERE documento = $1",
				[datosUsuario.documento]
			);

			if (documentoExistente.rows.length > 0) {
				throw new Error("Ya existe un usuario con este documento");
			}

			// Insertar el usuario
			const insertQuery = `
				INSERT INTO usuarios (
					id_tipo_identificacion,
					documento,
					nombre,
					apellido,
					fecha_nacimiento,
					id_estado_civil,
					dia_ingreso,
					id_tipo_contrato,
					id_arl,
					arl_fecha_ingreso,
					id_eps,
					eps_fecha_ingreso,
					id_caja_compensacion,
					id_fondo_pensiones,
					induccion_sst,
					induccion_puesto_trabajo,
					afiliacion_a_beneficiarios,
					nombre_contacto,
					telefono_contacto,
					direccion,
					celular,
					correo_electronico,
					firma_reglamento_interno_trabajo,
					firma_elementos_proteccion,
					firma_contrato,
					password,
					id_estado
				) VALUES (
					$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27
				) RETURNING id_usuarios, documento, nombre, apellido, correo_electronico
			`;

			const valores = [
				datosUsuario.id_tipo_identificacion,
				datosUsuario.documento,
				datosUsuario.nombre,
				datosUsuario.apellido,
				datosUsuario.fecha_nacimiento || null,
				datosUsuario.id_estado_civil || null,
				datosUsuario.dia_ingreso || null,
				datosUsuario.id_tipo_contrato || null,
				datosUsuario.id_arl || null,
				datosUsuario.arl_fecha_ingreso || null,
				datosUsuario.id_eps || null,
				datosUsuario.eps_fecha_ingreso || null,
				datosUsuario.id_caja_compensacion || null,
				datosUsuario.id_fondo_pensiones || null,
				datosUsuario.induccion_sst || false,
				datosUsuario.induccion_puesto_trabajo || false,
				datosUsuario.afiliacion_a_beneficiarios || false,
				datosUsuario.nombre_contacto || null,
				datosUsuario.telefono_contacto || null,
				datosUsuario.direccion || null,
				datosUsuario.celular || null,
				datosUsuario.correo_electronico || null,
				datosUsuario.firma_reglamento_interno_trabajo || false,
				datosUsuario.firma_elementos_proteccion || false,
				datosUsuario.firma_contrato || false,
				datosUsuario.password,
				datosUsuario.id_estado || 1 // Por defecto "Activo"
			];

			// Si no se proporcionó id_estado, obtener el ID del estado "Activo"
			if (!datosUsuario.id_estado) {
				const idEstadoActivo = await this.obtenerIdEstadoActivo();
				valores[valores.length - 1] = idEstadoActivo;
			}

			const resultadoUsuario = await client.query(insertQuery, valores);
			const usuarioCreado = resultadoUsuario.rows[0];

			// Asignar roles si se proporcionaron
			if (datosUsuario.roles && Array.isArray(datosUsuario.roles) && datosUsuario.roles.length > 0) {
				for (const idRol of datosUsuario.roles) {
					await client.query(
						"INSERT INTO usuarios_x_rol (id_usuarios, id_rol) VALUES ($1, $2)",
						[usuarioCreado.id_usuarios, idRol]
					);
				}
			}

			await client.query("COMMIT");

			logger.info({ 
				usuarioId: usuarioCreado.id_usuarios, 
				documento: usuarioCreado.documento 
			}, "Usuario creado exitosamente");

			return usuarioCreado;
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al crear usuario");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene los catálogos necesarios para el formulario de creación
	 * @returns {Promise<Object>} Catálogos
	 */
	async obtenerCatalogos() {
		try {
			// Usar el esquema public explícitamente
			const [
				tiposIdentificacion,
				tiposContrato,
				estadosCiviles,
				arls,
				epss,
				cajasCompensacion,
				fondosPensiones,
				estados,
				roles
			] = await Promise.all([
				pool.query("SELECT id_tipo_identificacion, nombre FROM public.tipo_identificacion ORDER BY nombre"),
				pool.query("SELECT id_tipo_contrato, nombre FROM public.tipo_contrato ORDER BY nombre"),
				pool.query("SELECT id_estado_civil, nombre FROM public.estado_civil ORDER BY nombre"),
				pool.query("SELECT id_arl, nombre FROM public.arl ORDER BY nombre"),
				pool.query("SELECT id_eps, nombre FROM public.eps ORDER BY nombre"),
				pool.query("SELECT id_caja_compensacion, nombre FROM public.caja_compensacion ORDER BY nombre"),
				pool.query("SELECT id_fondo_pensiones, nombre FROM public.fondo_pensiones ORDER BY nombre"),
				pool.query("SELECT id_estado, nombre FROM public.estado WHERE modulo = 'Global' ORDER BY nombre"),
				pool.query("SELECT id_rol, nombre FROM public.rol ORDER BY nombre")
			]);

			logger.info({
				tiposIdentificacion: tiposIdentificacion.rows.length,
				tiposContrato: tiposContrato.rows.length,
				estadosCiviles: estadosCiviles.rows.length,
				arls: arls.rows.length,
				epss: epss.rows.length,
				cajasCompensacion: cajasCompensacion.rows.length,
				fondosPensiones: fondosPensiones.rows.length,
				estados: estados.rows.length,
				roles: roles.rows.length
			}, "Catálogos obtenidos exitosamente");

			return {
				tiposIdentificacion: tiposIdentificacion.rows,
				tiposContrato: tiposContrato.rows,
				estadosCiviles: estadosCiviles.rows,
				arls: arls.rows,
				epss: epss.rows,
				cajasCompensacion: cajasCompensacion.rows,
				fondosPensiones: fondosPensiones.rows,
				estados: estados.rows,
				roles: roles.rows
			};
		} catch (error) {
			logger.error({ err: error, stack: error.stack }, "Error al obtener catálogos");
			throw error;
		}
	}

	/**
	 * Obtiene todos los usuarios con sus roles
	 * @returns {Promise<Array>} Lista de usuarios
	 */
	async obtenerUsuarios() {
		try {
			const query = `
				SELECT 
					u.id_usuarios,
					u.documento,
					u.nombre,
					u.apellido,
					u.correo_electronico,
					u.id_estado,
					e.nombre as estado_nombre,
					COALESCE(
						json_agg(
							json_build_object(
								'id_rol', r.id_rol,
								'nombre_rol', r.nombre
							)
						) FILTER (WHERE r.id_rol IS NOT NULL),
						'[]'::json
					) as roles
				FROM public.usuarios u
				LEFT JOIN public.estado e ON u.id_estado = e.id_estado
				LEFT JOIN public.usuarios_x_rol uxr ON u.id_usuarios = uxr.id_usuarios
				LEFT JOIN public.rol r ON uxr.id_rol = r.id_rol
				GROUP BY u.id_usuarios, u.documento, u.nombre, u.apellido, u.correo_electronico, u.id_estado, e.nombre
				ORDER BY u.nombre, u.apellido
			`;

			const result = await pool.query(query);
			
			// Convertir roles de JSON a array si es necesario
			const usuarios = result.rows.map(usuario => {
				if (typeof usuario.roles === 'string') {
					usuario.roles = JSON.parse(usuario.roles);
				}
				return usuario;
			});

			return usuarios;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener usuarios");
			throw error;
		}
	}

	/**
	 * Obtiene un usuario completo por ID
	 * @param {number} idUsuario - ID del usuario
	 * @returns {Promise<Object>} Usuario completo
	 */
	async obtenerUsuarioPorId(idUsuario) {
		try {
			const query = `
				SELECT 
					u.*,
					ti.nombre as tipo_identificacion_nombre,
					tc.nombre as tipo_contrato_nombre,
					ec.nombre as estado_civil_nombre,
					arl.nombre as arl_nombre,
					eps.nombre as eps_nombre,
					cc.nombre as caja_compensacion_nombre,
					fp.nombre as fondo_pensiones_nombre,
					e.nombre as estado_nombre,
					COALESCE(
						json_agg(
							json_build_object(
								'id_rol', r.id_rol,
								'nombre_rol', r.nombre
							)
						) FILTER (WHERE r.id_rol IS NOT NULL),
						'[]'::json
					) as roles
				FROM public.usuarios u
				LEFT JOIN public.tipo_identificacion ti ON u.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.tipo_contrato tc ON u.id_tipo_contrato = tc.id_tipo_contrato
				LEFT JOIN public.estado_civil ec ON u.id_estado_civil = ec.id_estado_civil
				LEFT JOIN public.arl arl ON u.id_arl = arl.id_arl
				LEFT JOIN public.eps eps ON u.id_eps = eps.id_eps
				LEFT JOIN public.caja_compensacion cc ON u.id_caja_compensacion = cc.id_caja_compensacion
				LEFT JOIN public.fondo_pensiones fp ON u.id_fondo_pensiones = fp.id_fondo_pensiones
				LEFT JOIN public.estado e ON u.id_estado = e.id_estado
				LEFT JOIN public.usuarios_x_rol uxr ON u.id_usuarios = uxr.id_usuarios
				LEFT JOIN public.rol r ON uxr.id_rol = r.id_rol
				WHERE u.id_usuarios = $1
				GROUP BY u.id_usuarios, ti.nombre, tc.nombre, ec.nombre, arl.nombre, eps.nombre, cc.nombre, fp.nombre, e.nombre
			`;

			const result = await pool.query(query, [idUsuario]);

			if (result.rows.length === 0) {
				throw new Error("Usuario no encontrado");
			}

			const usuario = result.rows[0];
			
			// No enviar la contraseña
			delete usuario.password;

			// Convertir roles de JSON a array si es necesario
			if (typeof usuario.roles === 'string') {
				usuario.roles = JSON.parse(usuario.roles);
			}

			return usuario;
		} catch (error) {
			logger.error({ err: error, idUsuario }, "Error al obtener usuario por ID");
			throw error;
		}
	}

	/**
	 * Actualiza el estado de un usuario
	 * @param {number} idUsuario - ID del usuario
	 * @param {number} idEstado - ID del nuevo estado
	 * @returns {Promise<Object>} Usuario actualizado
	 */
	async actualizarEstadoUsuario(idUsuario, idEstado) {
		try {
			const query = `
				UPDATE public.usuarios 
				SET id_estado = $1 
				WHERE id_usuarios = $2
				RETURNING id_usuarios, documento, nombre, apellido, id_estado
			`;

			const result = await pool.query(query, [idEstado, idUsuario]);

			if (result.rows.length === 0) {
				throw new Error("Usuario no encontrado");
			}

			logger.info({ idUsuario, idEstado }, "Estado de usuario actualizado");

			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idUsuario, idEstado }, "Error al actualizar estado de usuario");
			throw error;
		}
	}

	/**
	 * Actualiza un usuario completo
	 * @param {number} idUsuario - ID del usuario
	 * @param {Object} datosUsuario - Datos del usuario a actualizar
	 * @returns {Promise<Object>} Usuario actualizado
	 */
	async actualizarUsuario(idUsuario, datosUsuario) {
		const client = await pool.connect();
		
		try {
			await client.query("BEGIN");

			// Validar que el usuario exista
			const usuarioExistente = await client.query(
				"SELECT id_usuarios FROM usuarios WHERE id_usuarios = $1",
				[idUsuario]
			);

			if (usuarioExistente.rows.length === 0) {
				throw new Error("Usuario no encontrado");
			}

			// Validar que el documento no esté en uso por otro usuario
			if (datosUsuario.documento) {
				const documentoExistente = await client.query(
					"SELECT id_usuarios FROM usuarios WHERE documento = $1 AND id_usuarios != $2",
					[datosUsuario.documento, idUsuario]
				);

				if (documentoExistente.rows.length > 0) {
					throw new Error("Ya existe otro usuario con este documento");
				}
			}

			// Construir la query de actualización dinámicamente
			const campos = [];
			const valores = [];
			let contador = 1;

			const camposPermitidos = {
				id_tipo_identificacion: datosUsuario.id_tipo_identificacion,
				documento: datosUsuario.documento,
				nombre: datosUsuario.nombre,
				apellido: datosUsuario.apellido,
				fecha_nacimiento: datosUsuario.fecha_nacimiento,
				id_estado_civil: datosUsuario.id_estado_civil,
				dia_ingreso: datosUsuario.dia_ingreso,
				id_tipo_contrato: datosUsuario.id_tipo_contrato,
				id_arl: datosUsuario.id_arl,
				arl_fecha_ingreso: datosUsuario.arl_fecha_ingreso,
				id_eps: datosUsuario.id_eps,
				eps_fecha_ingreso: datosUsuario.eps_fecha_ingreso,
				id_caja_compensacion: datosUsuario.id_caja_compensacion,
				id_fondo_pensiones: datosUsuario.id_fondo_pensiones,
				induccion_sst: datosUsuario.induccion_sst,
				induccion_puesto_trabajo: datosUsuario.induccion_puesto_trabajo,
				afiliacion_a_beneficiarios: datosUsuario.afiliacion_a_beneficiarios,
				nombre_contacto: datosUsuario.nombre_contacto,
				telefono_contacto: datosUsuario.telefono_contacto,
				direccion: datosUsuario.direccion,
				celular: datosUsuario.celular,
				correo_electronico: datosUsuario.correo_electronico,
				firma_reglamento_interno_trabajo: datosUsuario.firma_reglamento_interno_trabajo,
				firma_elementos_proteccion: datosUsuario.firma_elementos_proteccion,
				firma_contrato: datosUsuario.firma_contrato,
				id_estado: datosUsuario.id_estado
			};

			// Si se proporciona password, agregarlo
			if (datosUsuario.password) {
				camposPermitidos.password = datosUsuario.password;
			}

			for (const [campo, valor] of Object.entries(camposPermitidos)) {
				if (valor !== undefined && valor !== null) {
					campos.push(`${campo} = $${contador}`);
					valores.push(valor);
					contador++;
				}
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idUsuario);
			const updateQuery = `
				UPDATE public.usuarios 
				SET ${campos.join(", ")}
				WHERE id_usuarios = $${contador}
				RETURNING id_usuarios, documento, nombre, apellido, correo_electronico
			`;

			const resultadoUsuario = await client.query(updateQuery, valores);

			// Actualizar roles si se proporcionaron
			if (datosUsuario.roles !== undefined) {
				// Eliminar roles existentes
				await client.query(
					"DELETE FROM usuarios_x_rol WHERE id_usuarios = $1",
					[idUsuario]
				);

				// Agregar nuevos roles
				if (Array.isArray(datosUsuario.roles) && datosUsuario.roles.length > 0) {
					for (const idRol of datosUsuario.roles) {
						await client.query(
							"INSERT INTO usuarios_x_rol (id_usuarios, id_rol) VALUES ($1, $2)",
							[idUsuario, idRol]
						);
					}
				}
			}

			await client.query("COMMIT");

			logger.info({ 
				usuarioId: idUsuario, 
				documento: resultadoUsuario.rows[0].documento 
			}, "Usuario actualizado exitosamente");

			return resultadoUsuario.rows[0];
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al actualizar usuario");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene las alertas/pendientes de todos los usuarios
	 * @returns {Promise<Array>} Lista de alertas por usuario
	 */
	async obtenerAlertasUsuarios() {
		try {
			const query = `
				SELECT 
					u.id_usuarios,
					u.documento,
					u.nombre,
					u.apellido,
					u.induccion_sst,
					u.induccion_puesto_trabajo,
					u.afiliacion_a_beneficiarios,
					u.firma_reglamento_interno_trabajo,
					u.firma_elementos_proteccion,
					u.firma_contrato,
					u.arl_fecha_ingreso,
					u.eps_fecha_ingreso,
					u.dia_ingreso
				FROM public.usuarios u
				WHERE u.id_estado IN (
					SELECT id_estado FROM public.estado 
					WHERE nombre ILIKE '%activo%' AND (modulo = 'Usuarios' OR modulo = 'Global')
				)
				ORDER BY u.nombre, u.apellido
			`;

			const result = await pool.query(query);
			
			// Procesar alertas para cada usuario
			const alertas = result.rows.map(usuario => {
				const pendientes = [];
				
				// Verificar firmas y documentos pendientes
				if (!usuario.firma_contrato) {
					pendientes.push({
						tipo: 'firma_contrato',
						mensaje: 'Falta firma de contrato',
						prioridad: 'alta'
					});
				}
				
				if (!usuario.firma_reglamento_interno_trabajo) {
					pendientes.push({
						tipo: 'firma_reglamento',
						mensaje: 'Falta firma de reglamento interno de trabajo',
						prioridad: 'alta'
					});
				}
				
				if (!usuario.firma_elementos_proteccion) {
					pendientes.push({
						tipo: 'firma_elementos',
						mensaje: 'Falta firma de elementos de protección',
						prioridad: 'alta'
					});
				}
				
				if (!usuario.induccion_sst) {
					pendientes.push({
						tipo: 'induccion_sst',
						mensaje: 'Falta inducción de SST',
						prioridad: 'alta'
					});
				}
				
				if (!usuario.induccion_puesto_trabajo) {
					pendientes.push({
						tipo: 'induccion_puesto',
						mensaje: 'Falta inducción de puesto de trabajo',
						prioridad: 'media'
					});
				}
				
				if (!usuario.afiliacion_a_beneficiarios) {
					pendientes.push({
						tipo: 'afiliacion_beneficiarios',
						mensaje: 'Falta afiliación a beneficiarios',
						prioridad: 'media'
					});
				}
				
				return {
					id_usuarios: usuario.id_usuarios,
					documento: usuario.documento,
					nombre: usuario.nombre,
					apellido: usuario.apellido,
					nombre_completo: `${usuario.nombre} ${usuario.apellido}`,
					pendientes: pendientes,
					total_pendientes: pendientes.length
				};
			}).filter(usuario => usuario.total_pendientes > 0); // Solo usuarios con pendientes
			
			logger.info({ total_alertas: alertas.length }, "Alertas de usuarios obtenidas exitosamente");
			return alertas;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener alertas de usuarios");
			throw error;
		}
	}
}

module.exports = new UsuariosService();

