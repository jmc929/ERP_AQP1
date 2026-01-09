const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Servicio para operaciones relacionadas con proveedores
 */
class ProveedoresService {
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
	 * Obtiene todos los proveedores
	 * @returns {Promise<Array>} Lista de proveedores
	 */
	async obtenerProveedores() {
		try {
			const query = `
				SELECT 
					p.*,
					te.nombre as tipo_entidad_nombre,
					ti.nombre as tipo_identificacion_nombre,
					c.nombre as ciudad_nombre,
					tri.nombre as tipo_regimen_iva_nombre,
					rf.nombre as responsabilidad_fiscal_nombre,
					rf.codigo as responsabilidad_fiscal_codigo,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.proveedor p
				LEFT JOIN public.tipo_entidad te ON p.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON p.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad c ON p.id_ciudad = c.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON p.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON p.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON p.id_estado = e.id_estado
				ORDER BY p.id_proveedor DESC
			`;

			const result = await pool.query(query);
			logger.info({ count: result.rows.length }, "Proveedores obtenidos exitosamente");
			return result.rows;
		} catch (error) {
			logger.error({ err: error }, "Error al obtener proveedores");
			throw error;
		}
	}

	/**
	 * Obtiene proveedores con paginación y búsqueda
	 * @param {number} page - Número de página
	 * @param {number} limit - Cantidad de registros por página
	 * @param {string} busqueda - Texto de búsqueda
	 * @returns {Promise<Object>} Proveedores paginados
	 */
	async obtenerProveedoresPaginados(page = 1, limit = 30, busqueda = "") {
		try {
			const offset = (page - 1) * limit;
			let query = `
				SELECT 
					p.*,
					te.nombre as tipo_entidad_nombre,
					ti.nombre as tipo_identificacion_nombre,
					c.nombre as ciudad_nombre,
					tri.nombre as tipo_regimen_iva_nombre,
					rf.nombre as responsabilidad_fiscal_nombre,
					rf.codigo as responsabilidad_fiscal_codigo,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.proveedor p
				LEFT JOIN public.tipo_entidad te ON p.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON p.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad c ON p.id_ciudad = c.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON p.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON p.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON p.id_estado = e.id_estado
			`;
			const valores = [];
			let contador = 1;

			// Agregar filtro de búsqueda si existe
			if (busqueda && busqueda.trim() !== "") {
				query += ` WHERE (
					p.razon_social ILIKE $${contador} OR 
					p.nombre_comercial ILIKE $${contador} OR
					p.identificacion ILIKE $${contador} OR
					CONCAT(p.nombre_contacto, ' ', p.apellido_contacto) ILIKE $${contador} OR
					c.nombre ILIKE $${contador} OR
					ti.nombre ILIKE $${contador}
				)`;
				valores.push(`%${busqueda.trim()}%`);
				contador++;
			}

			query += ` ORDER BY p.id_proveedor DESC LIMIT $${contador} OFFSET $${contador + 1}`;
			valores.push(limit, offset);

			// Contar total de registros
			let countQuery = `
				SELECT COUNT(*) as total
				FROM public.proveedor p
				LEFT JOIN public.tipo_entidad te ON p.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON p.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad c ON p.id_ciudad = c.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON p.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON p.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON p.id_estado = e.id_estado
			`;
			const countValores = [];
			let countContador = 1;

			if (busqueda && busqueda.trim() !== "") {
				countQuery += ` WHERE (
					p.razon_social ILIKE $${countContador} OR 
					p.nombre_comercial ILIKE $${countContador} OR
					p.identificacion ILIKE $${countContador} OR
					CONCAT(p.nombre_contacto, ' ', p.apellido_contacto) ILIKE $${countContador} OR
					c.nombre ILIKE $${countContador} OR
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
			}, "Proveedores paginados obtenidos exitosamente");

			return {
				proveedores: result.rows,
				paginacion: {
					paginaActual: page,
					totalPaginas,
					totalRegistros: total,
					limite: limit
				}
			};
		} catch (error) {
			logger.error({ err: error }, "Error al obtener proveedores paginados");
			throw error;
		}
	}

	/**
	 * Obtiene un proveedor por ID
	 * @param {number} idProveedor - ID del proveedor
	 * @returns {Promise<Object>} Proveedor
	 */
		async obtenerProveedorPorId(idProveedor) {
		try {
			const query = `
				SELECT 
					p.*,
					te.nombre as tipo_entidad_nombre,
					ti.nombre as tipo_identificacion_nombre,
					c.nombre as ciudad_nombre,
					tri.nombre as tipo_regimen_iva_nombre,
					rf.nombre as responsabilidad_fiscal_nombre,
					rf.codigo as responsabilidad_fiscal_codigo,
					e.nombre as estado_nombre,
					e.color as estado_color
				FROM public.proveedor p
				LEFT JOIN public.tipo_entidad te ON p.id_tipo_entidad = te.id_tipo_entidad
				LEFT JOIN public.tipo_identificacion ti ON p.id_tipo_identificacion = ti.id_tipo_identificacion
				LEFT JOIN public.ciudad c ON p.id_ciudad = c.id_ciudad
				LEFT JOIN public.tipo_regimen_iva tri ON p.id_tipo_regimen_iva = tri.id_regimen_iva
				LEFT JOIN public.responsabilidad_fiscal rf ON p.id_responsabilidad_fiscal = rf.id_responsabilidad_fiscal
				LEFT JOIN public.estado e ON p.id_estado = e.id_estado
				WHERE p.id_proveedor = $1
			`;

			const result = await pool.query(query, [idProveedor]);

			if (result.rows.length === 0) {
				throw new Error("Proveedor no encontrado");
			}

			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idProveedor }, "Error al obtener proveedor por ID");
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
			logger.error({ err: error }, "Error al obtener catálogos de proveedores");
			throw error;
		}
	}

	/**
	 * Crea un nuevo proveedor
	 * @param {Object} datosProveedor - Datos del proveedor
	 * @returns {Promise<Object>} Proveedor creado
	 */
	async crearProveedor(datosProveedor) {
		try {
			// Validar que la identificación no exista
			if (datosProveedor.identificacion) {
				const identificacionExistente = await pool.query(
					"SELECT id_proveedor FROM public.proveedor WHERE identificacion = $1",
					[datosProveedor.identificacion]
				);

				if (identificacionExistente.rows.length > 0) {
					throw new Error("Ya existe un proveedor con esta identificación");
				}
			}

			// Calcular DV automáticamente si no se proporciona y hay identificación
			let dv = datosProveedor.dv;
			if (!dv && datosProveedor.identificacion) {
				dv = this.calcularDV(datosProveedor.identificacion);
			}

			const query = `
				INSERT INTO public.proveedor (
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
				RETURNING id_proveedor, id_tipo_entidad, id_tipo_identificacion, identificacion, dv, telefono, 
					razon_social, nombre_comercial, id_ciudad, direccion, nombre_contacto, apellido_contacto, 
					correo_electronico, id_tipo_regimen_iva, id_responsabilidad_fiscal, id_estado
			`;

			const valores = [
				datosProveedor.id_tipo_entidad || null,
				datosProveedor.id_tipo_identificacion || null,
				datosProveedor.identificacion || null,
				dv !== null && dv !== undefined ? dv : null,
				datosProveedor.telefono || null,
				datosProveedor.razon_social || null,
				datosProveedor.nombre_comercial || null,
				datosProveedor.id_ciudad || null,
				datosProveedor.direccion || null,
				datosProveedor.nombre_contacto || null,
				datosProveedor.apellido_contacto || null,
				datosProveedor.correo_electronico || null,
				datosProveedor.id_tipo_regimen_iva || null,
				datosProveedor.id_responsabilidad_fiscal || null,
				datosProveedor.id_estado || null
			];

			const result = await pool.query(query, valores);
			logger.info({ proveedorId: result.rows[0].id_proveedor }, "Proveedor creado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error }, "Error al crear proveedor");
			throw error;
		}
	}

	/**
	 * Actualiza un proveedor
	 * @param {number} idProveedor - ID del proveedor
	 * @param {Object} datosProveedor - Datos actualizados
	 * @returns {Promise<Object>} Proveedor actualizado
	 */
	async actualizarProveedor(idProveedor, datosProveedor) {
		try {
			// Validar que el proveedor exista
			const proveedorExistente = await pool.query(
				"SELECT id_proveedor FROM public.proveedor WHERE id_proveedor = $1",
				[idProveedor]
			);

			if (proveedorExistente.rows.length === 0) {
				throw new Error("Proveedor no encontrado");
			}

			// Validar que la identificación no esté en uso por otro proveedor
			if (datosProveedor.identificacion) {
				const identificacionExistente = await pool.query(
					"SELECT id_proveedor FROM public.proveedor WHERE identificacion = $1 AND id_proveedor != $2",
					[datosProveedor.identificacion, idProveedor]
				);

				if (identificacionExistente.rows.length > 0) {
					throw new Error("Ya existe otro proveedor con esta identificación");
				}
			}

			// Calcular DV automáticamente si se actualiza la identificación y no se proporciona DV
			let dv = datosProveedor.dv;
			if (datosProveedor.identificacion && (dv === undefined || dv === null || dv === "")) {
				dv = this.calcularDV(datosProveedor.identificacion);
			}

			// Construir la query de actualización dinámicamente
			const campos = [];
			const valores = [];
			let contador = 1;

			const camposPermitidos = {
				id_tipo_entidad: datosProveedor.id_tipo_entidad,
				id_tipo_identificacion: datosProveedor.id_tipo_identificacion,
				identificacion: datosProveedor.identificacion,
				dv: dv !== undefined ? dv : datosProveedor.dv,
				telefono: datosProveedor.telefono,
				razon_social: datosProveedor.razon_social,
				nombre_comercial: datosProveedor.nombre_comercial,
				id_ciudad: datosProveedor.id_ciudad,
				direccion: datosProveedor.direccion,
				nombre_contacto: datosProveedor.nombre_contacto,
				apellido_contacto: datosProveedor.apellido_contacto,
				correo_electronico: datosProveedor.correo_electronico,
				id_tipo_regimen_iva: datosProveedor.id_tipo_regimen_iva,
				id_responsabilidad_fiscal: datosProveedor.id_responsabilidad_fiscal,
				id_estado: datosProveedor.id_estado
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

			valores.push(idProveedor);
			const query = `
				UPDATE public.proveedor 
				SET ${campos.join(", ")}
				WHERE id_proveedor = $${contador}
				RETURNING id_proveedor, id_tipo_entidad, id_tipo_identificacion, identificacion, dv, telefono, 
					razon_social, nombre_comercial, id_ciudad, direccion, nombre_contacto, apellido_contacto, 
					correo_electronico, id_tipo_regimen_iva, id_responsabilidad_fiscal, id_estado
			`;

			const result = await pool.query(query, valores);
			logger.info({ proveedorId: idProveedor }, "Proveedor actualizado exitosamente");
			return result.rows[0];
		} catch (error) {
			logger.error({ err: error, idProveedor }, "Error al actualizar proveedor");
			throw error;
		}
	}

	/**
	 * Elimina un proveedor
	 * @param {number} idProveedor - ID del proveedor
	 * @returns {Promise<boolean>} true si se eliminó correctamente
	 */
	async eliminarProveedor(idProveedor) {
		try {
			const result = await pool.query(
				"DELETE FROM public.proveedor WHERE id_proveedor = $1 RETURNING id_proveedor",
				[idProveedor]
			);

			if (result.rows.length === 0) {
				throw new Error("Proveedor no encontrado");
			}

			logger.info({ proveedorId: idProveedor }, "Proveedor eliminado exitosamente");
			return true;
		} catch (error) {
			logger.error({ err: error, idProveedor }, "Error al eliminar proveedor");
			throw error;
		}
	}
}

module.exports = new ProveedoresService();
