const clientesService = require("./clientes.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene todos los clientes
 */
async function obtenerClientes(req, res) {
	try {
		const clientes = await clientesService.obtenerClientes();
		res.json({
			success: true,
			clientes
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerClientes controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene clientes con paginación
 */
async function obtenerClientesPaginados(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 30;
		const busqueda = req.query.busqueda || "";

		const resultado = await clientesService.obtenerClientesPaginados(page, limit, busqueda);
		res.json({
			success: true,
			clientes: resultado.clientes,
			paginacion: resultado.paginacion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerClientesPaginados controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene un cliente por ID
 */
async function obtenerClientePorId(req, res) {
	try {
		const { id } = req.params;
		const cliente = await clientesService.obtenerClientePorId(parseInt(id));
		res.json({
			success: true,
			cliente
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerClientePorId controller");
		
		if (error.message === "Cliente no encontrado") {
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
		const catalogos = await clientesService.obtenerCatalogos();
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
 * Crea un nuevo cliente
 */
async function crearCliente(req, res) {
	try {
		const datosCliente = req.body;

		// Validaciones básicas
		if (!datosCliente.identificacion) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "La identificación es obligatoria"
			});
		}

		const cliente = await clientesService.crearCliente(datosCliente);
		res.status(201).json({
			success: true,
			message: "Cliente creado exitosamente",
			cliente
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearCliente controller");
		
		if (error.message === "Ya existe un cliente con esta identificación") {
			return res.status(409).json({
				error: "Cliente duplicado",
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
 * Actualiza un cliente
 */
async function actualizarCliente(req, res) {
	try {
		const { id } = req.params;
		const datosCliente = req.body;

		const cliente = await clientesService.actualizarCliente(parseInt(id), datosCliente);
		res.json({
			success: true,
			message: "Cliente actualizado exitosamente",
			cliente
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarCliente controller");
		
		if (error.message === "Cliente no encontrado" || error.message === "Ya existe otro cliente con esta identificación") {
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
 * Elimina un cliente
 */
async function eliminarCliente(req, res) {
	try {
		const { id } = req.params;
		await clientesService.eliminarCliente(parseInt(id));
		res.json({
			success: true,
			message: "Cliente eliminado exitosamente"
		});
	} catch (error) {
		logger.error({ err: error }, "Error en eliminarCliente controller");
		
		if (error.message === "Cliente no encontrado") {
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

		const dv = clientesService.calcularDV(identificacion);

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
	obtenerClientes,
	obtenerClientesPaginados,
	obtenerClientePorId,
	obtenerCatalogos,
	crearCliente,
	actualizarCliente,
	eliminarCliente,
	calcularDV
};

