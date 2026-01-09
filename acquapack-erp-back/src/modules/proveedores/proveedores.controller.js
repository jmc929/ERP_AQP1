const proveedoresService = require("./proveedores.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene todos los proveedores
 */
async function obtenerProveedores(req, res) {
	try {
		const proveedores = await proveedoresService.obtenerProveedores();
		res.json({
			success: true,
			proveedores
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProveedores controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene proveedores con paginación
 */
async function obtenerProveedoresPaginados(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 30;
		const busqueda = req.query.busqueda || "";

		const resultado = await proveedoresService.obtenerProveedoresPaginados(page, limit, busqueda);
		res.json({
			success: true,
			proveedores: resultado.proveedores,
			paginacion: resultado.paginacion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProveedoresPaginados controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene un proveedor por ID
 */
async function obtenerProveedorPorId(req, res) {
	try {
		const { id } = req.params;
		const proveedor = await proveedoresService.obtenerProveedorPorId(parseInt(id));
		res.json({
			success: true,
			proveedor
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProveedorPorId controller");
		
		if (error.message === "Proveedor no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene los catálogos para el formulario
 */
async function obtenerCatalogos(req, res) {
	try {
		const catalogos = await proveedoresService.obtenerCatalogos();
		res.json({
			success: true,
			catalogos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCatalogos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Crea un nuevo proveedor
 */
async function crearProveedor(req, res) {
	try {
		const datosProveedor = req.body;

		// Validaciones básicas
		if (!datosProveedor.identificacion) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "La identificación es obligatoria"
			});
		}

		const proveedor = await proveedoresService.crearProveedor(datosProveedor);
		res.status(201).json({
			success: true,
			message: "Proveedor creado exitosamente",
			proveedor
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearProveedor controller");
		
		if (error.message === "Ya existe un proveedor con esta identificación") {
			return res.status(409).json({
				error: "Proveedor duplicado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Actualiza un proveedor
 */
async function actualizarProveedor(req, res) {
	try {
		const { id } = req.params;
		const datosProveedor = req.body;

		const proveedor = await proveedoresService.actualizarProveedor(parseInt(id), datosProveedor);
		res.json({
			success: true,
			message: "Proveedor actualizado exitosamente",
			proveedor
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarProveedor controller");
		
		if (error.message === "Proveedor no encontrado" || error.message === "Ya existe otro proveedor con esta identificación") {
			return res.status(400).json({
				error: "Error de validación",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Elimina un proveedor
 */
async function eliminarProveedor(req, res) {
	try {
		const { id } = req.params;
		await proveedoresService.eliminarProveedor(parseInt(id));
		res.json({
			success: true,
			message: "Proveedor eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarProveedor controller");
		
		if (error.message === "Proveedor no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Calcula el dígito verificador (DV) de una identificación
 */
async function calcularDV(req, res) {
	try {
		const { identificacion } = req.query;

		if (!identificacion) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "La identificación es obligatoria"
			});
		}

		const dv = proveedoresService.calcularDV(identificacion);

		if (dv === null) {
			return res.status(400).json({
				error: "Error de cálculo",
				message: "No se pudo calcular el DV. Verifique que la identificación sea válida."
			});
		}

		res.json({
			success: true,
			dv
		});
	} catch (error) {
		logger.error({ err: error }, "Error en calcularDV controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerProveedores,
	obtenerProveedoresPaginados,
	obtenerProveedorPorId,
	obtenerCatalogos,
	crearProveedor,
	actualizarProveedor,
	eliminarProveedor,
	calcularDV
};

