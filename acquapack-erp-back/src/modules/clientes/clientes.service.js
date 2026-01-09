const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con clientes
 */
class ClientesService {
	/**
	 * Calcula el dígito verificador (DV) de un NIT usando el algoritmo Módulo 11
	 * @param {string} identificacion - Número de identificación sin el DV
	 * @returns {number} Dígito verificador calculado
	 */
	calcularDV(identificacion) {
		try {
			// Remover espacios y caracteres no numéricos
			const nit = identificacion.toString().replace(/\D/g, "");
			
			if (!nit || nit.length === 0) {
				return null;
			}

			// Serie de números primos para el cálculo (según norma DIAN)
			const primos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

			// Invertir el número (leer de derecha a izquierda)
			const nitInvertido = nit.split("").reverse();

			// Multiplicar cada dígito por su primo correspondiente y sumar
			let suma = 0;
			for (let i = 0; i < nitInvertido.length; i++) {
				const digito = parseInt(nitInvertido[i], 10);
				const primo = primos[i % primos.length]; // Usar módulo para repetir la serie si es necesario
				suma += digito * primo;
			}

			// Calcular el residuo de la división por 11
			const residuo = suma % 11;

			// Calcular el DV según las reglas:
			// Si el residuo es 0 o 1, el DV es el mismo residuo
			// Si el residuo es mayor a 1, el DV es 11 menos el residuo
			let dv;
			if (residuo === 0 || residuo === 1) {
				dv = residuo;
			} else {
				dv = 11 - residuo;
			}

			return dv;
		} catch (error) {
			logger.error({ err: error, identificacion }, "Error al calcular DV");
			return null;
		}
	}
	/**
	 * Obtiene todos los clientes
	 * @returns {Promise<Array>} Lista de clientes
	 */
		async obtenerClientes() {
		try {
			const query = `
				SELECT 
					c.*,
					te.nombre as tipo_entidad_nombre,
					ti.nombre as tipo_identificacion_nombre,
					ci.nombre as ciudad_nombre,
					tri.nombre as tipo_regimen_iva_nombre,
					rf.nombre as responsabilidad_fiscal_nombre,
					rf.codigo as responsabilidad_fiscal_codigo,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.clientes c
				LEFT JOIN public.tipo_entidad te ON c.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON c.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad ci ON c.id_ciudad = ci.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON c.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON c.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON c.id_estado = e.id_estado
				ORDER BY c.id_cliente DESC
			`;

			const result = await pool.query(query);
			logger.info({ count: result.rows.length }, "Clientes obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener clientes");
			throw error;
		}
	}

	/**
	 * Obtiene clientes con paginación y búsqueda
	 * @param {number} page - Número de página
	 * @param {number} limit - Cantidad de registros por página
	 * @param {string} busqueda - Texto de búsqueda
	 * @returns {Promise<Object>} Clientes paginados
	 */
	async obtenerClientesPaginados(page = 1, limit = 30, busqueda = "") {
		try {
			const offset = (page - 1) * limit;
			let query = `
				SELECT 
					c.*,
					te.nombre as tipo_entidad_nombre,
					ti.nombre as tipo_identificacion_nombre,
					ci.nombre as ciudad_nombre,
					tri.nombre as tipo_regimen_iva_nombre,
					rf.nombre as responsabilidad_fiscal_nombre,
					rf.codigo as responsabilidad_fiscal_codigo,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.clientes c
				LEFT JOIN public.tipo_entidad te ON c.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON c.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad ci ON c.id_ciudad = ci.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON c.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON c.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON c.id_estado = e.id_estado
			`;
			const valores = [];
			let contador = 1;

			// Agregar filtro de búsqueda si existe
			if (busqueda && busqueda.trim() !== "") {
				query += ` WHERE (
					c.razon_social ILIKE $${contador} OR 
					c.nombre_comercial ILIKE $${contador} OR
					c.identificacion ILIKE $${contador} OR
					CONCAT(c.nombre_contacto, ' ', c.apellido_contacto) ILIKE $${contador} OR
					ci.nombre ILIKE $${contador} OR
					ti.nombre ILIKE $${contador}
				)`;
				valores.push(`%${busqueda.trim()}%`);
				contador++;
			}

			query += ` ORDER BY c.id_cliente DESC LIMIT $${contador} OFFSET $${contador + 1}`;
			valores.push(limit, offset);

			// Contar total de registros
			let countQuery = `
				SELECT COUNT(*) as total
				FROM public.clientes c
				LEFT JOIN public.tipo_entidad te ON c.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON c.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad ci ON c.id_ciudad = ci.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON c.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON c.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON c.id_estado = e.id_estado
			`;
			const countValores = [];
			let countContador = 1;

			if (busqueda && busqueda.trim() !== "") {
				countQuery += ` WHERE (
					c.razon_social ILIKE $${countContador} OR 
					c.nombre_comercial ILIKE $${countContador} OR
					c.identificacion ILIKE $${countContador} OR
					CONCAT(c.nombre_contacto, ' ', c.apellido_contacto) ILIKE $${countContador} OR
					ci.nombre ILIKE $${countContador} OR
					ti.nombre ILIKE $${countContador}
				)`;
				countValores.push(`%${busqueda.trim()}%`);
			}

			const [result, countResult] = await Promise.all([
				pool.query(query, valores),
				pool.query(countQuery, countValores)
			]);

			const total = parseInt(countResult.rows[0].total, 10);
			const totalPaginas = Math.ceil(total / limit);

			logger.info({ 
				page, 
				limit, 
				busqueda, 
				total, 
				totalPaginas, 
				count: result.rows.length 
			}, "Clientes paginados obtenidos exitosamente");

			return {
				clientes: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros: total,
					limite: limit
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener clientes paginados");
			throw error;
		}
	}

	/**
	 * Obtiene un cliente por ID
	 * @param {number} idCliente - ID del cliente
	 * @returns {Promise<Object>} Cliente
	 */
		async obtenerClientePorId(idCliente) {
		try {
			const query = `
				SELECT 
					c.*,
					te.nombre as tipo_entidad_nombre,
					ti.nombre as tipo_identificacion_nombre,
					ci.nombre as ciudad_nombre,
					tri.nombre as tipo_regimen_iva_nombre,
					rf.nombre as responsabilidad_fiscal_nombre,
					rf.codigo as responsabilidad_fiscal_codigo,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.clientes c
				LEFT JOIN public.tipo_entidad te ON c.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON c.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad ci ON c.id_ciudad = ci.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON c.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON c.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON c.id_estado = e.id_estado
				WHERE c.id_cliente = $1
			`;

			const result = await pool.query(query, [idCliente]);

			if (result.rows.length === 0) {
				throw new Error("Cliente no encontrado");
			}

			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idCliente }, "Error al obtener cliente por ID");
			throw error;
		}
	}

	/**
	 * Obtiene los catálogos necesarios para el formulario
	 * @returns {Promise<Object>} Catálogos
	 */
		async obtenerCatalogos() {
		try {
			const [
				tiposEntidad,
				tiposIdentificacion,
				ciudades,
				tiposRegimenIva,
				responsabilidadesFiscales,
				estados
			] = await Promise.all([
				pool.query("SELECT id_tipo_entidad, nombre FROM public.tipo_entidad ORDER BY nombre"),
				pool.query("SELECT id_tipo_identificacion, nombre FROM public.tipo_identificacion ORDER BY nombre"),
				pool.query("SELECT id_ciudad, nombre FROM public.ciudad ORDER BY nombre"),
				pool.query("SELECT id_regimen_iva, nombre FROM public.tipo_regimen_iva ORDER BY nombre"),
				pool.query("SELECT id_responsabilidad_fiscal, nombre, codigo FROM public.responsabilidad_fiscal ORDER BY nombre"),
				pool.query("SELECT id_estado, nombre, color FROM public.estado WHERE id_estado IN (1, 2, 3) ORDER BY id_estado")
			]);

			return {
				tiposEntidad: tiposEntidad.rows,
				tiposIdentificacion: tiposIdentificacion.rows,
				ciudades: ciudades.rows,
				tiposRegimenIva: tiposRegimenIva.rows,
				responsabilidadesFiscales: responsabilidadesFiscales.rows,
				estados: estados.rows
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener catálogos de clientes");
			throw error;
		}
	}

	/**
	 * Crea un nuevo cliente
	 * @param {Object} datosCliente - Datos del cliente
	 * @returns {Promise<Object>} Cliente creado
	 */
	async crearCliente(datosCliente) {
		try {
			// Validar que la identificación no exista
			if (datosCliente.identificacion) {
				const identificacionExistente = await pool.query(
					"SELECT id_cliente FROM public.clientes WHERE identificacion = $1",
					[datosCliente.identificacion]
				);

				if (identificacionExistente.rows.length > 0) {
					throw new Error("Ya existe un cliente con esta identificación");
				}
			}

			// Calcular DV automáticamente si no se proporciona y hay identificación
			let dv = datosCliente.dv;
			if (!dv && datosCliente.identificacion) {
				dv = this.calcularDV(datosCliente.identificacion);
			}

			const query = `
				INSERT INTO public.clientes (
					id_tipo_entidad,
					id_tipo_identificacion,
					identificacion,
					dv,
					telefono,
					razon_social,
					nombre_comercial,
					id_ciudad,
					direccion,
					nombre_contacto,
					apellido_contacto,
					correo_electronico,
					id_tipo_regimen_iva,
					id_responsabilidad_fiscal,
					id_estado
				) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
				RETURNING id_cliente, id_tipo_entidad, id_tipo_identificacion, identificacion, dv, telefono, 
					razon_social, nombre_comercial, id_ciudad, direccion, nombre_contacto, apellido_contacto, 
					correo_electronico, id_tipo_regimen_iva, id_responsabilidad_fiscal, id_estado
			`;

			const valores = [
				datosCliente.id_tipo_entidad || null,
				datosCliente.id_tipo_identificacion || null,
				datosCliente.identificacion || null,
				dv !== null && dv !== undefined ? dv : null,
				datosCliente.telefono || null,
				datosCliente.razon_social || null,
				datosCliente.nombre_comercial || null,
				datosCliente.id_ciudad || null,
				datosCliente.direccion || null,
				datosCliente.nombre_contacto || null,
				datosCliente.apellido_contacto || null,
				datosCliente.correo_electronico || null,
				datosCliente.id_tipo_regimen_iva || null,
				datosCliente.id_responsabilidad_fiscal || null,
				datosCliente.id_estado || null
			];

			const result = await pool.query(query, valores);
			logger.info({ clienteId: result.rows[0].id_cliente }, "Cliente creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear cliente");
			throw error;
		}
	}

	/**
	 * Actualiza un cliente
	 * @param {number} idCliente - ID del cliente
	 * @param {Object} datosCliente - Datos actualizados
	 * @returns {Promise<Object>} Cliente actualizado
	 */
	async actualizarCliente(idCliente, datosCliente) {
		try {
			// Validar que el cliente exista
			const clienteExistente = await pool.query(
				"SELECT id_cliente FROM public.clientes WHERE id_cliente = $1",
				[idCliente]
			);

			if (clienteExistente.rows.length === 0) {
				throw new Error("Cliente no encontrado");
			}

			// Validar que la identificación no esté en uso por otro cliente
			if (datosCliente.identificacion) {
				const identificacionExistente = await pool.query(
					"SELECT id_cliente FROM public.clientes WHERE identificacion = $1 AND id_cliente != $2",
					[datosCliente.identificacion, idCliente]
				);

				if (identificacionExistente.rows.length > 0) {
					throw new Error("Ya existe otro cliente con esta identificación");
				}
			}

			// Calcular DV automáticamente si se actualiza la identificación y no se proporciona DV
			let dv = datosCliente.dv;
			if (datosCliente.identificacion && (dv === undefined || dv === null || dv === "")) {
				dv = this.calcularDV(datosCliente.identificacion);
			}

			// Construir la query de actualización dinámicamente
			const campos = [];
			const valores = [];
			let contador = 1;

			const camposPermitidos = {
				id_tipo_entidad: datosCliente.id_tipo_entidad,
				id_tipo_identificacion: datosCliente.id_tipo_identificacion,
				identificacion: datosCliente.identificacion,
				dv: dv !== undefined ? dv : datosCliente.dv,
				telefono: datosCliente.telefono,
				razon_social: datosCliente.razon_social,
				nombre_comercial: datosCliente.nombre_comercial,
				id_ciudad: datosCliente.id_ciudad,
				direccion: datosCliente.direccion,
				nombre_contacto: datosCliente.nombre_contacto,
				apellido_contacto: datosCliente.apellido_contacto,
				correo_electronico: datosCliente.correo_electronico,
				id_tipo_regimen_iva: datosCliente.id_tipo_regimen_iva,
				id_responsabilidad_fiscal: datosCliente.id_responsabilidad_fiscal,
				id_estado: datosCliente.id_estado
			};

			for (const [campo, valor] of Object.entries(camposPermitidos)) {
				if (valor !== undefined) {
					campos.push(`${campo} = $${contador}`);
					valores.push(valor === null || valor === "" ? null : valor);
					contador++;
				}
			}

			if (campos.length === 0) {
				throw new Error("No se proporcionaron campos para actualizar");
			}

			valores.push(idCliente);
			const query = `
				UPDATE public.clientes 
				SET ${campos.join(", ")}
				WHERE id_cliente = $${contador}
				RETURNING id_cliente, id_tipo_entidad, id_tipo_identificacion, identificacion, dv, telefono, 
					razon_social, nombre_comercial, id_ciudad, direccion, nombre_contacto, apellido_contacto, 
					correo_electronico, id_tipo_regimen_iva, id_responsabilidad_fiscal, id_estado
			`;

			const result = await pool.query(query, valores);
			logger.info({ clienteId: idCliente }, "Cliente actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idCliente }, "Error al actualizar cliente");
			throw error;
		}
	}

	/**
	 * Elimina un cliente
	 * @param {number} idCliente - ID del cliente
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarCliente(idCliente) {
		try {
			const result = await pool.query(
				"DELETE FROM public.clientes WHERE id_cliente = $1 RETURNING id_cliente",
				[idCliente]
			);

			if (result.rows.length === 0) {
				throw new Error("Cliente no encontrado");
			}

			logger.info({ clienteId: idCliente }, "Cliente eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idCliente }, "Error al eliminar cliente");
			throw error;
		}
	}
}

module.exports = new ClientesService();

