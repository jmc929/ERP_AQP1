const productosService = require("./productos.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene productos con paginación y filtros
 */
async function obtenerProductos(req, res) {
	try {
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 20;
		
		const filtros = {
			busqueda: req.query.busqueda || null,
			id_familia: req.query.id_familia || null,
			id_grupos_producto: req.query.id_grupos_producto || null,
			id_estado: req.query.id_estado || null,
			mostrar_archivados: req.query.mostrar_archivados === "true" || false
		};

		// Eliminar filtros nulos
		Object.keys(filtros).forEach(key => {
			if (filtros[key] === null) {
				delete filtros[key];
			}
		});

		const resultado = await productosService.obtenerProductos(filtros, pagina, limite);

		res.json({
			success: true,
			...resultado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProductos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene los catálogos para los filtros
 */
async function obtenerCatalogos(req, res) {
	try {
		const catalogos = await productosService.obtenerCatalogos();
		
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
 * Obtiene el siguiente código de barras disponible
 */
async function obtenerSiguienteCodigoBarras(req, res) {
	try {
		const codigoBarras = await productosService.obtenerSiguienteCodigoBarras();
		
		res.json({
			success: true,
			codigo_barras: codigoBarras
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerSiguienteCodigoBarras controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene un producto por su ID
 */
async function obtenerProductoPorId(req, res) {
	try {
		const { id } = req.params;
		const producto = await productosService.obtenerProductoPorId(parseInt(id));
		
		res.json({
			success: true,
			producto
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProductoPorId controller");
		
		if (error.message === "Producto no encontrado") {
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
 * Actualiza un producto existente
 */
async function actualizarProducto(req, res) {
	try {
		const { id } = req.params;
		const datosProducto = req.body;

		// Validaciones básicas
		if (datosProducto.nombre !== undefined && !datosProducto.nombre) {
			return res.status(400).json({
				error: "Campo inválido",
				message: "El nombre no puede estar vacío"
			});
		}

		const productoActualizado = await productosService.actualizarProducto(parseInt(id), datosProducto);

		res.json({
			success: true,
			message: "Producto actualizado exitosamente",
			producto: productoActualizado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarProducto controller");
		
		if (error.message === "Producto no encontrado") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otro producto con este código") {
			return res.status(409).json({
				error: "Producto duplicado",
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
 * Crea un nuevo producto
 */
async function crearProducto(req, res) {
	try {
		const datosProducto = req.body;

		// Validaciones básicas
		if (!datosProducto.nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const productoCreado = await productosService.crearProducto(datosProducto);

		res.status(201).json({
			success: true,
			message: "Producto creado exitosamente",
			producto: productoCreado
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearProducto controller");
		
		if (error.message === "Ya existe un producto con este código") {
			return res.status(409).json({
				error: "Producto duplicado",
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
 * Obtiene los costos por productos
 */
async function obtenerCostosPorProductos(req, res) {
	try {
		const costos = await productosService.obtenerCostosPorProductos();
		
		res.json({
			success: true,
			costos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCostosPorProductos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerProductos,
	obtenerCatalogos,
	obtenerSiguienteCodigoBarras,
	obtenerProductoPorId,
	actualizarProducto,
	crearProducto,
	obtenerCostosPorProductos
};

