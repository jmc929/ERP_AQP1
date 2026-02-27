const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con producción
 */
class ProduccionService {
	/**
	 * Obtiene todos los turnos
	 * @returns {Promise<Array>} Lista de turnos
	 */
	async obtenerTurnos() {
		try {
			const result = await pool.query(`
				SELECT 
					t.id_turno,
					t.nombre,
					t.horario
				FROM public.turno t
				ORDER BY t.id_turno
			`);
			logger.info({ count: result.rows.length }, "Turnos obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener turnos");
			throw error;
		}
	}

	/**
	 * Determina el turno según la hora actual
	 * @param {Date} fechaHora - Fecha y hora a evaluar (opcional, por defecto ahora)
	 * @returns {Promise<Object|null>} Turno correspondiente o null
	 */
	async determinarTurnoPorHora(fechaHora = null) {
		try {
			const ahora = fechaHora || new Date();
			const hora = ahora.getHours();

			// Obtener todos los turnos
			const turnos = await this.obtenerTurnos();

			// Buscar turno según la hora
			// Diurno: 6 AM a 6 PM (6-17)
			// Nocturno: 6 PM a 6 AM (18-23, 0-5)
			for (const turno of turnos) {
				const nombreLower = turno.nombre.toLowerCase();
				if (nombreLower.includes("diurno") && hora >= 6 && hora < 18) {
					return turno;
				}
				if (nombreLower.includes("nocturno") && (hora >= 18 || hora < 6)) {
					return turno;
				}
			}

			// Si no se encuentra, devolver el primero o null
			return turnos.length > 0 ? turnos[0] : null;
		} catch (error) {
			logger.error({ err: error }, "Error al determinar turno por hora");
			throw error;
		}
	}

	/**
	 * Obtiene todas las medidas
	 * @returns {Promise<Array>} Lista de medidas
	 */
	async obtenerMedidas() {
		try {
			const result = await pool.query(`
				SELECT 
					m.id_medida,
					m.nombre
				FROM public.medida m
				ORDER BY m.nombre
			`);
			logger.info({ count: result.rows.length }, "Medidas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener medidas");
			throw error;
		}
	}

	/**
	 * Obtiene máquinas filtradas por tipo de máquina
	 * @param {number} idTipoMaquina - ID del tipo de máquina (opcional)
	 * @returns {Promise<Array>} Lista de máquinas
	 */
	async obtenerMaquinas(idTipoMaquina = null) {
		try {
			let query = `
				SELECT 
					m.id_maquina,
					m.id_tipo_maquina,
					m.nombre,
					m.observaciones,
					tm.nombre as tipo_maquina_nombre
				FROM public.maquinas m
				LEFT JOIN public.tipo_maquina tm ON m.id_tipo_maquina = tm.id_tipo_maquina
			`;

			const params = [];
			if (idTipoMaquina) {
				query += ` WHERE m.id_tipo_maquina = $1`;
				params.push(idTipoMaquina);
			}

			query += ` ORDER BY m.nombre`;

			const result = await pool.query(query, params);
			logger.info({ count: result.rows.length, idTipoMaquina }, "Máquinas obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener máquinas");
			throw error;
		}
	}

	/**
	 * Obtiene productos activos, opcionalmente filtrados por grupo
	 * @param {number} idGrupoProducto - ID del grupo de producto (opcional)
	 * @returns {Promise<Array>} Lista de productos
	 */
	async obtenerProductos(idGrupoProducto = null) {
		try {
			let query = `
				SELECT 
					p.id_producto,
					p.codigo,
					p.nombre,
					p.id_grupos_producto,
					gp.nombre as grupo_nombre,
					m.nombre as medida_nombre
				FROM public.producto p
				LEFT JOIN public.medida m ON p.id_medida = m.id_medida
				LEFT JOIN public.grupos_productos gp ON p.id_grupos_producto = gp.id_grupos_productos
				WHERE p.id_estado IS NULL OR p.id_estado NOT IN (
					SELECT id_estado FROM public.estado WHERE nombre = 'Eliminado'
				)
			`;

			const params = [];
			if (idGrupoProducto) {
				query += ` AND p.id_grupos_producto = $1`;
				params.push(idGrupoProducto);
			}

			query += ` ORDER BY p.nombre`;

			const result = await pool.query(query, params);
			logger.info({ count: result.rows.length, idGrupoProducto }, "Productos obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener productos");
			throw error;
		}
	}

	/**
	 * Obtiene productos activos paginados, filtrados por grupo y opcionalmente por búsqueda
	 * @param {number} idGrupoProducto - ID del grupo de producto
	 * @param {number} page - Página (1-based)
	 * @param {number} limit - Cantidad por página
	 * @param {string} busqueda - Búsqueda por nombre o código (opcional)
	 * @returns {Promise<{ productos: Array, paginacion: Object }>}
	 */
	async obtenerProductosPaginados(idGrupoProducto, page = 1, limit = 30, busqueda = null) {
		try {
			const offset = (page - 1) * limit;
			let where = `
				WHERE (p.id_estado IS NULL OR p.id_estado NOT IN (
					SELECT id_estado FROM public.estado WHERE nombre = 'Eliminado'
				))
				AND p.id_grupos_producto = $1
			`;
			const countParams = [idGrupoProducto];
			const dataParams = [idGrupoProducto];

			if (busqueda && String(busqueda).trim()) {
				const term = `%${String(busqueda).trim().toLowerCase()}%`;
				where += ` AND (LOWER(p.nombre) LIKE $${countParams.length + 1} OR LOWER(COALESCE(p.codigo, '')) LIKE $${countParams.length + 1})`;
				countParams.push(term);
				dataParams.push(term);
			}

			const countQuery = `
				SELECT COUNT(*)::int as total
				FROM public.producto p
				${where}
			`;
			const countResult = await pool.query(countQuery, countParams);
			const totalRegistros = countResult.rows[0]?.total ?? 0;
			const totalPaginas = Math.max(1, Math.ceil(totalRegistros / limit));
			const hayMas = page < totalPaginas;

			let dataQuery = `
				SELECT 
					p.id_producto,
					p.codigo,
					p.nombre,
					p.id_grupos_producto,
					gp.nombre as grupo_nombre,
					m.nombre as medida_nombre
				FROM public.producto p
				LEFT JOIN public.medida m ON p.id_medida = m.id_medida
				LEFT JOIN public.grupos_productos gp ON p.id_grupos_producto = gp.id_grupos_productos
				${where}
				ORDER BY p.nombre
				LIMIT $${dataParams.length + 1} OFFSET $${dataParams.length + 2}
			`;
			dataParams.push(limit, offset);
			const result = await pool.query(dataQuery, dataParams);

			return {
				productos: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros,
					limite: limit,
					hayMas
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener productos paginados");
			throw error;
		}
	}

	/**
	 * Obtiene usuarios activos filtrados por roles específicos
	 * @returns {Promise<Array>} Lista de usuarios con roles 9, 11, 8, 10, 22
	 */
	async obtenerUsuarios() {
		try {
			const result = await pool.query(`
				SELECT DISTINCT
					u.id_usuarios,
					u.nombre,
					u.apellido,
					u.documento
				FROM public.usuarios u
				INNER JOIN public.usuarios_x_rol uxr ON u.id_usuarios = uxr.id_usuarios
				WHERE (u.id_estado IS NULL OR u.id_estado IN (
					SELECT id_estado FROM public.estado WHERE nombre = 'Activo'
				))
				AND uxr.id_rol IN (9, 11, 8, 10, 22)
				ORDER BY u.nombre, u.apellido
			`);
			logger.info({ count: result.rows.length }, "Usuarios obtenidos exitosamente (filtrados por roles 9, 11, 8, 10, 22)");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener usuarios");
			throw error;
		}
	}

	/**
	 * Crea un nuevo registro de producción
	 * @param {Object} datosProduccion - Datos de la producción
	 * @returns {Promise<Object>} Producción creada
	 */
	async crearProduccion(datosProduccion) {
		const client = await pool.connect();
		try {
			logger.info({ datosProduccion }, "Iniciando creación de producción");
			await client.query("BEGIN");

			// Validar que el producto existe
			if (!datosProduccion.id_producto) {
				throw new Error("El producto es requerido");
			}
			const productoResult = await client.query(
				"SELECT id_producto FROM public.producto WHERE id_producto = $1",
				[datosProduccion.id_producto]
			);

			if (productoResult.rows.length === 0) {
				throw new Error("El producto seleccionado no existe");
			}

			// Validar que la máquina existe
			if (!datosProduccion.id_maquina) {
				throw new Error("La máquina es requerida");
			}
			const maquinaResult = await client.query(
				"SELECT id_maquina FROM public.maquinas WHERE id_maquina = $1",
				[datosProduccion.id_maquina]
			);

			if (maquinaResult.rows.length === 0) {
				throw new Error("La máquina seleccionada no existe");
			}

			// Validar que el usuario existe
			if (!datosProduccion.id_usuario) {
				throw new Error("El usuario es requerido");
			}
			const usuarioResult = await client.query(
				"SELECT id_usuarios FROM public.usuarios WHERE id_usuarios = $1",
				[datosProduccion.id_usuario]
			);

			if (usuarioResult.rows.length === 0) {
				throw new Error("El usuario seleccionado no existe");
			}

			// Validar que el turno existe
			if (!datosProduccion.id_turno) {
				throw new Error("El turno es requerido");
			}
			const turnoResult = await client.query(
				"SELECT id_turno FROM public.turno WHERE id_turno = $1",
				[datosProduccion.id_turno]
			);

			if (turnoResult.rows.length === 0) {
				throw new Error("El turno seleccionado no existe");
			}

			// Sincronizar secuencia de id_produccion antes de insertar (por si está desincronizada)
			await client.query(`
				SELECT setval(
					pg_get_serial_sequence('public.produccion', 'id_produccion'),
					COALESCE((SELECT MAX(id_produccion) FROM public.produccion), 0) + 1,
					false
				)
			`);

			// Preparar fecha_hora: convertir string ISO a Date si es necesario
			let fechaHora = datosProduccion.fecha_hora;
			if (fechaHora) {
				// Si es un string, convertirlo a Date
				if (typeof fechaHora === 'string') {
					fechaHora = new Date(fechaHora);
				}
			} else {
				fechaHora = new Date();
			}

			logger.info({ 
				id_producto: datosProduccion.id_producto,
				id_maquina: datosProduccion.id_maquina,
				id_usuario: datosProduccion.id_usuario,
				id_turno: datosProduccion.id_turno,
				fecha_hora: fechaHora,
				medidas_count: datosProduccion.medidas?.length || 0
			}, "Insertando producción");

			// Insertar producción
			const produccionResult = await client.query(`
				INSERT INTO public.produccion (
					id_producto,
					id_maquina,
					id_usuario,
					id_turno,
					fecha_hora
				) VALUES ($1, $2, $3, $4, $5)
				RETURNING *
			`, [
				datosProduccion.id_producto,
				datosProduccion.id_maquina,
				datosProduccion.id_usuario,
				datosProduccion.id_turno,
				fechaHora
			]);

			const produccion = produccionResult.rows[0];

			// Insertar medidas de producción
			if (datosProduccion.medidas && Array.isArray(datosProduccion.medidas) && datosProduccion.medidas.length > 0) {
				for (const medida of datosProduccion.medidas) {
					// Validar que la medida existe
					const medidaResult = await client.query(
						"SELECT id_medida FROM public.medida WHERE id_medida = $1",
						[medida.id_medida]
					);

					if (medidaResult.rows.length === 0) {
						throw new Error(`La medida con ID ${medida.id_medida} no existe`);
					}

					// Sincronizar secuencia de id_produccion_medida antes de insertar
					await client.query(`
						SELECT setval(
							pg_get_serial_sequence('public.produccion_medida', 'id_produccion_medida'),
							COALESCE((SELECT MAX(id_produccion_medida) FROM public.produccion_medida), 0) + 1,
							false
						)
					`);

					await client.query(`
						INSERT INTO public.produccion_medida (
							id_produccion,
							id_medida,
							cantidad
						) VALUES ($1, $2, $3)
					`, [
						produccion.id_produccion,
						medida.id_medida,
						medida.cantidad
					]);
				}
			}

			await client.query("COMMIT");

			// Obtener la producción completa con relaciones
			const produccionCompleta = await this.obtenerProduccionPorId(produccion.id_produccion);

			logger.info({ idProduccion: produccion.id_produccion }, "Producción creada exitosamente");
			return produccionCompleta;
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error }, "Error al crear producción");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene una producción por ID con todos sus detalles
	 * @param {number} idProduccion - ID de la producción
	 * @returns {Promise<Object>} Producción con detalles
	 */
	async obtenerProduccionPorId(idProduccion) {
		try {
			// Obtener producción principal
			const produccionResult = await pool.query(`
				SELECT 
					p.id_produccion,
					p.id_producto,
					p.id_maquina,
					p.id_usuario,
					p.id_turno,
					p.fecha_hora,
					pr.nombre as producto_nombre,
					pr.codigo as producto_codigo,
					m.nombre as maquina_nombre,
					tm.nombre as tipo_maquina_nombre,
					u.nombre || ' ' || u.apellido as usuario_nombre,
					u.documento as usuario_documento,
					t.nombre as turno_nombre,
					t.horario as turno_horario
				FROM public.produccion p
				LEFT JOIN public.producto pr ON p.id_producto = pr.id_producto
				LEFT JOIN public.maquinas m ON p.id_maquina = m.id_maquina
				LEFT JOIN public.tipo_maquina tm ON m.id_tipo_maquina = tm.id_tipo_maquina
				LEFT JOIN public.usuarios u ON p.id_usuario = u.id_usuarios
				LEFT JOIN public.turno t ON p.id_turno = t.id_turno
				WHERE p.id_produccion = $1
			`, [idProduccion]);

			if (produccionResult.rows.length === 0) {
				throw new Error("Producción no encontrada");
			}

			const produccion = produccionResult.rows[0];

			// Obtener medidas de producción
			const medidasResult = await pool.query(`
				SELECT 
					pm.id_produccion_medida,
					pm.id_produccion,
					pm.id_medida,
					pm.cantidad,
					m.nombre as medida_nombre
				FROM public.produccion_medida pm
				LEFT JOIN public.medida m ON pm.id_medida = m.id_medida
				WHERE pm.id_produccion = $1
			`, [idProduccion]);

			produccion.medidas = medidasResult.rows;

			return produccion;
		} catch (error) {
			logger.error({ err: error, idProduccion }, "Error al obtener producción por ID");
			throw error;
		}
	}

	/**
	 * Actualiza las medidas de una producción (kilos, metros, etc.)
	 * @param {number} idProduccion - ID de la producción
	 * @param {Object} datos - { medidas: [ { id_produccion_medida, cantidad } ] }
	 * @returns {Promise<Object>} Producción actualizada
	 */
	async actualizarProduccion(idProduccion, datos) {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");

			const existente = await client.query(
				"SELECT id_produccion FROM public.produccion WHERE id_produccion = $1",
				[idProduccion]
			);
			if (existente.rows.length === 0) {
				throw new Error("Producción no encontrada");
			}

			if (datos.id_producto !== undefined && datos.id_producto !== null) {
				const idProducto = parseInt(datos.id_producto, 10);
				if (!isNaN(idProducto) && idProducto > 0) {
					const prodExistente = await client.query(
						"SELECT id_producto FROM public.producto WHERE id_producto = $1",
						[idProducto]
					);
					if (prodExistente.rows.length === 0) {
						throw new Error("El producto seleccionado no existe");
					}
					await client.query(
						"UPDATE public.produccion SET id_producto = $1 WHERE id_produccion = $2",
						[idProducto, idProduccion]
					);
				}
			}

			if (datos.medidas && Array.isArray(datos.medidas) && datos.medidas.length > 0) {
				for (const m of datos.medidas) {
					const idPm = parseInt(m.id_produccion_medida, 10);
					const cantidad = parseFloat(m.cantidad);
					if (isNaN(idPm) || idPm <= 0) continue;
					await client.query(`
						UPDATE public.produccion_medida
						SET cantidad = $1
						WHERE id_produccion_medida = $2 AND id_produccion = $3
					`, [cantidad, idPm, idProduccion]);
				}
			}

			await client.query("COMMIT");
			const produccionActualizada = await this.obtenerProduccionPorId(idProduccion);
			logger.info({ idProduccion }, "Producción actualizada exitosamente");
			return produccionActualizada;
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error({ err: error, idProduccion }, "Error al actualizar producción");
			throw error;
		} finally {
			client.release();
		}
	}

	/**
	 * Obtiene todas las producciones con información relacionada
	 * @returns {Promise<Array>} Lista de producciones
	 */
	async obtenerProducciones() {
		try {
			const result = await pool.query(`
				SELECT 
					p.id_produccion,
					p.id_producto,
					p.id_maquina,
					p.id_usuario,
					p.id_turno,
					p.fecha_hora,
					pr.nombre as producto_nombre,
					pr.codigo as producto_codigo,
					m.nombre as maquina_nombre,
					tm.nombre as tipo_maquina_nombre,
					tm.id_tipo_maquina,
					u.nombre || ' ' || u.apellido as usuario_nombre,
					u.documento as usuario_documento,
					t.nombre as turno_nombre,
					t.horario as turno_horario
				FROM public.produccion p
				LEFT JOIN public.producto pr ON p.id_producto = pr.id_producto
				LEFT JOIN public.maquinas m ON p.id_maquina = m.id_maquina
				LEFT JOIN public.tipo_maquina tm ON m.id_tipo_maquina = tm.id_tipo_maquina
				LEFT JOIN public.usuarios u ON p.id_usuario = u.id_usuarios
				LEFT JOIN public.turno t ON p.id_turno = t.id_turno
				ORDER BY p.fecha_hora DESC, p.id_produccion DESC
			`);
			logger.info({ count: result.rows.length }, "Producciones obtenidas exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener producciones");
			throw error;
		}
	}

	/**
	 * Obtiene producciones con filtros aplicados
	 * @param {Object} filtros - Filtros de búsqueda
	 * @param {number} filtros.id_tipo_maquina - ID del tipo de máquina (requerido)
	 * @param {string} filtros.fecha_desde - Fecha desde (formato: YYYY-MM-DD)
	 * @param {string} filtros.fecha_hasta - Fecha hasta (formato: YYYY-MM-DD)
	 * @param {number} filtros.id_turno - ID del turno
	 * @param {number} filtros.id_usuario - ID del usuario
	 * @returns {Promise<Array>} Lista de producciones filtradas
	 */
	async obtenerProduccionesFiltradas(filtros = {}, pagina = 1, limite = 50) {
		let query = '';
		let params = [];
		
		try {
			// Asegurar que id_tipo_maquina sea un ID numérico entero válido
			const idTipoMaquina = parseInt(filtros.id_tipo_maquina, 10);
			
			if (!idTipoMaquina || isNaN(idTipoMaquina)) {
				throw new Error("El tipo de máquina es requerido para filtrar producciones");
			}

			query = `
				SELECT 
					p.id_produccion,
					p.id_producto,
					p.id_maquina,
					p.id_usuario,
					p.id_turno,
					p.fecha_hora,
					pr.nombre as producto_nombre,
					pr.codigo as producto_codigo,
					m.nombre as maquina_nombre,
					tm.nombre as tipo_maquina_nombre,
					tm.id_tipo_maquina,
					COALESCE(CONCAT(u.nombre, ' ', u.apellido), 'N/A') as usuario_nombre,
					COALESCE(u.documento, '') as usuario_documento,
					COALESCE(t.nombre, 'N/A') as turno_nombre,
					COALESCE(t.horario, '') as turno_horario,
					COALESCE(
						json_agg(
							json_build_object(
								'id_medida', med.id_medida,
								'medida_nombre', med.nombre,
								'cantidad', pm.cantidad
							)
						) FILTER (WHERE pm.id_produccion_medida IS NOT NULL),
						'[]'::json
					) as medidas
				FROM public.produccion p
				INNER JOIN public.maquinas m ON p.id_maquina = m.id_maquina
				INNER JOIN public.tipo_maquina tm ON m.id_tipo_maquina = tm.id_tipo_maquina
				LEFT JOIN public.producto pr ON p.id_producto = pr.id_producto
				LEFT JOIN public.usuarios u ON p.id_usuario = u.id_usuarios
				LEFT JOIN public.turno t ON p.id_turno = t.id_turno
				LEFT JOIN public.produccion_medida pm ON p.id_produccion = pm.id_produccion
				LEFT JOIN public.medida med ON pm.id_medida = med.id_medida
				WHERE tm.id_tipo_maquina = $1
			`;

			// Inicializar parámetros con el tipo de máquina (siempre requerido) - debe ser un entero
			params = [parseInt(idTipoMaquina, 10)];
			let paramCounter = 2;

			// Filtro por fecha desde - si tiene valor, agregarlo a la consulta
			if (filtros.fecha_desde) {
				query += ` AND DATE(p.fecha_hora) >= $${paramCounter}`;
				params.push(filtros.fecha_desde);
				paramCounter++;
			}

			// Filtro por fecha hasta - si tiene valor, agregarlo a la consulta
			if (filtros.fecha_hasta) {
				query += ` AND DATE(p.fecha_hora) <= $${paramCounter}`;
				params.push(filtros.fecha_hasta);
				paramCounter++;
			}

			// Filtro por turno - debe ser un ID numérico entero
			if (filtros.id_turno !== null && filtros.id_turno !== undefined) {
				const idTurno = parseInt(filtros.id_turno, 10);
				if (!isNaN(idTurno) && idTurno > 0) {
					query += ` AND p.id_turno = $${paramCounter}`;
					params.push(idTurno);
					paramCounter++;
				}
			}

			// Filtro por usuario - debe ser un ID numérico entero
			if (filtros.id_usuario !== null && filtros.id_usuario !== undefined) {
				const idUsuario = parseInt(filtros.id_usuario, 10);
				if (!isNaN(idUsuario) && idUsuario > 0) {
					query += ` AND p.id_usuario = $${paramCounter}`;
					params.push(idUsuario);
					paramCounter++;
				}
			}

			// Filtro por producto - debe ser un ID numérico entero
			if (filtros.id_producto !== null && filtros.id_producto !== undefined) {
				const idProducto = parseInt(filtros.id_producto, 10);
				if (!isNaN(idProducto) && idProducto > 0) {
					query += ` AND p.id_producto = $${paramCounter}`;
					params.push(idProducto);
					paramCounter++;
				}
			}

			// Agregar GROUP BY después de todas las condiciones WHERE
			query += `
				GROUP BY 
					p.id_produccion,
					p.id_producto,
					p.id_maquina,
					p.id_usuario,
					p.id_turno,
					p.fecha_hora,
					pr.nombre,
					pr.codigo,
					m.nombre,
					tm.nombre,
					tm.id_tipo_maquina,
					u.nombre,
					u.apellido,
					u.documento,
					t.nombre,
					t.horario
			`;

			// Calcular offset para paginación
			const offset = (pagina - 1) * limite;
			
			query += ` ORDER BY p.fecha_hora DESC, p.id_produccion DESC LIMIT $${paramCounter} OFFSET $${paramCounter + 1}`;
			params.push(limite, offset);

			// Crear consulta COUNT para obtener el total de registros (sin GROUP BY, LIMIT, OFFSET)
			let countQuery = `
				SELECT COUNT(DISTINCT p.id_produccion) as total
				FROM public.produccion p
				INNER JOIN public.maquinas m ON p.id_maquina = m.id_maquina
				INNER JOIN public.tipo_maquina tm ON m.id_tipo_maquina = tm.id_tipo_maquina
				WHERE tm.id_tipo_maquina = $1
			`;
			
			const countParams = [idTipoMaquina];
			let countParamCounter = 2;

			// Aplicar los mismos filtros a la consulta COUNT
			if (filtros.fecha_desde) {
				countQuery += ` AND DATE(p.fecha_hora) >= $${countParamCounter}`;
				countParams.push(filtros.fecha_desde);
				countParamCounter++;
			}

			if (filtros.fecha_hasta) {
				countQuery += ` AND DATE(p.fecha_hora) <= $${countParamCounter}`;
				countParams.push(filtros.fecha_hasta);
				countParamCounter++;
			}

			if (filtros.id_turno !== null && filtros.id_turno !== undefined) {
				const idTurno = parseInt(filtros.id_turno, 10);
				if (!isNaN(idTurno) && idTurno > 0) {
					countQuery += ` AND p.id_turno = $${countParamCounter}`;
					countParams.push(idTurno);
					countParamCounter++;
				}
			}

			if (filtros.id_usuario !== null && filtros.id_usuario !== undefined) {
				const idUsuario = parseInt(filtros.id_usuario, 10);
				if (!isNaN(idUsuario) && idUsuario > 0) {
					countQuery += ` AND p.id_usuario = $${countParamCounter}`;
					countParams.push(idUsuario);
					countParamCounter++;
				}
			}

			if (filtros.id_producto !== null && filtros.id_producto !== undefined) {
				const idProducto = parseInt(filtros.id_producto, 10);
				if (!isNaN(idProducto) && idProducto > 0) {
					countQuery += ` AND p.id_producto = $${countParamCounter}`;
					countParams.push(idProducto);
					countParamCounter++;
				}
			}

			logger.info({ 
				query: query.substring(0, 500),
				paramsCount: params.length,
				pagina,
				limite,
				offset,
				filtros
			}, "Ejecutando consulta de producciones filtradas");
			
			// Ejecutar ambas consultas en paralelo
			const [result, countResult] = await Promise.all([
				pool.query(query, params),
				pool.query(countQuery, countParams)
			]);
			
			// Convertir medidas de JSON a array si es necesario
			const producciones = result.rows.map(produccion => {
				if (typeof produccion.medidas === 'string') {
					try {
						produccion.medidas = JSON.parse(produccion.medidas);
					} catch {
						produccion.medidas = [];
					}
				}
				// Asegurar que siempre sea un array
				if (!Array.isArray(produccion.medidas)) {
					produccion.medidas = [];
				}
				return produccion;
			});
			
			const total = parseInt(countResult.rows[0].total, 10);
			const totalPaginas = Math.ceil(total / limite);
			
			logger.info({ 
				count: producciones.length,
				total,
				totalPaginas,
				pagina,
				limite,
				filtros 
			}, "Producciones filtradas obtenidas exitosamente");
			
			return {
				producciones,
				paginacion: {
					paginaActual: pagina,
					totalPaginas,
					totalRegistros: total,
					limite,
					hasNextPage: pagina < totalPaginas,
					hasPrevPage: pagina > 1
				}
			};
		} catch (error) {
			logger.error({ 
				err: error, 
				message: error.message,
				stack: error.stack,
				filtros,
				query: query || 'N/A',
				params: params,
				paramsTypes: params ? params.map(p => typeof p) : []
			}, "Error al obtener producciones filtradas");
			throw error;
		}
	}
}

module.exports = new ProduccionService();

