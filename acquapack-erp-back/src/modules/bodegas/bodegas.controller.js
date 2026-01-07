const bodegasService = require("./bodegas.service");
const { logger } = require("../../common/logger");

async function obtenerBodegas(req, res) {
	try {
		const bodegas = await bodegasService.obtenerBodegas();
		res.json({
			success: true,
			bodegas: bodegas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerBodegas controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerBodegaPorId(req, res) {
	try {
		const { id } = req.params;
		const bodega = await bodegasService.obtenerBodegaPorId(parseInt(id));
		res.json({
			success: true,
			bodega: bodega
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerBodegaPorId controller");
		
		if (error.message === "Bodega no encontrada") {
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

async function obtenerCatalogos(req, res) {
	try {
		const catalogos = await bodegasService.obtenerCatalogos();
		res.json({
			success: true,
			catalogos: catalogos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCatalogos controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function crearBodega(req, res) {
	try {
		const { nombre, id_estado } = req.body;

		if (!nombre) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El nombre es obligatorio"
			});
		}

		const bodega = await bodegasService.crearBodega({ nombre, id_estado });
		res.status(201).json({
			success: true,
			message: "Bodega creada exitosamente",
			bodega: bodega
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearBodega controller");
		
		if (error.message === "Ya existe una bodega con este nombre") {
			return res.status(409).json({
				error: "Bodega duplicada",
				message: error.message
			});
		}

		if (error.message === "Estado no permitido. Solo se permiten estados con ID 1, 2 o 3") {
			return res.status(400).json({
				error: "Estado inválido",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function actualizarBodega(req, res) {
	try {
		const { id } = req.params;
		const { nombre, id_estado } = req.body;

		const bodega = await bodegasService.actualizarBodega(parseInt(id), { nombre, id_estado });
		res.json({
			success: true,
			message: "Bodega actualizada exitosamente",
			bodega: bodega
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarBodega controller");
		
		if (error.message === "Bodega no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Ya existe otra bodega con este nombre") {
			return res.status(409).json({
				error: "Bodega duplicada",
				message: error.message
			});
		}

		if (error.message === "Estado no permitido. Solo se permiten estados con ID 1, 2 o 3") {
			return res.status(400).json({
				error: "Estado inválido",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function cambiarEstadoBodega(req, res) {
	try {
		const { id } = req.params;
		const { id_estado } = req.body;

		if (!id_estado) {
			return res.status(400).json({
				error: "Campo requerido faltante",
				message: "El id_estado es obligatorio"
			});
		}

		const bodega = await bodegasService.cambiarEstadoBodega(parseInt(id), parseInt(id_estado));
		res.json({
			success: true,
			message: "Estado de bodega cambiado exitosamente",
			bodega: bodega
		});
	} catch (error) {
		logger.error({ err: error }, "Error en cambiarEstadoBodega controller");
		
		if (error.message === "Bodega no encontrada") {
			return res.status(404).json({
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message === "Estado no permitido. Solo se permiten estados con ID 1, 2 o 3") {
			return res.status(400).json({
				error: "Estado inválido",
				message: error.message
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerProductosPorBodega(req, res) {
	try {
		const { id } = req.params;
		const productos = await bodegasService.obtenerProductosPorBodega(parseInt(id));
		res.json({
			success: true,
			productos: productos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProductosPorBodega controller");
		res.status(500).json({
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function realizarTraslado(req, res) {
	try {
		const { id_bodega_origen, id_bodega_destino, traslados } = req.body;

		// Validaciones
		if (!id_bodega_origen || !id_bodega_destino) {
			return res.status(400).json({
				success: false,
				message: "Debe especificar bodega de origen y destino"
			});
		}

		if (!traslados || !Array.isArray(traslados) || traslados.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Debe especificar al menos un producto para trasladar"
			});
		}

		// Validar que todos los traslados tengan los campos necesarios
		for (const traslado of traslados) {
			if (!traslado.id_inventario || !traslado.id_producto || !traslado.id_factura || !traslado.cantidad) {
				return res.status(400).json({
					success: false,
					message: "Cada traslado debe tener id_inventario, id_producto, id_factura y cantidad"
				});
			}
		}

		const resultado = await bodegasService.realizarTraslado(
			parseInt(id_bodega_origen),
			parseInt(id_bodega_destino),
			traslados.map(t => ({
				id_inventario: parseInt(t.id_inventario),
				id_producto: parseInt(t.id_producto),
				id_factura: parseInt(t.id_factura),
				cantidad: parseFloat(t.cantidad)
			}))
		);

		res.status(200).json(resultado);
	} catch (error) {
		logger.error({ err: error }, "Error en realizarTraslado");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

async function obtenerMovimientosKardex(req, res) {
	try {
		const { id } = req.params; // id de bodega
		const { id_producto } = req.query;

		if (!id_producto) {
			return res.status(400).json({
				success: false,
				message: "Debe especificar el id_producto"
			});
		}

		const movimientos = await bodegasService.obtenerMovimientosKardex(
			parseInt(id),
			parseInt(id_producto)
		);

		res.json({
			success: true,
			movimientos: movimientos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerMovimientosKardex controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerBodegas,
	obtenerBodegaPorId,
	obtenerCatalogos,
	crearBodega,
	actualizarBodega,
	cambiarEstadoBodega,
	obtenerProductosPorBodega,
	realizarTraslado,
	obtenerMovimientosKardex
};

