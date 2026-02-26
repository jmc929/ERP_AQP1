const produccionService = require("./produccion.service");
const { logger } = require("../../common/logger");

/**
 * Obtiene todos los turnos
 */
async function obtenerTurnos(req, res) {
	try {
		const turnos = await produccionService.obtenerTurnos();
		res.json({
			success: true,
			turnos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTurnos controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todas las medidas
 */
async function obtenerMedidas(req, res) {
	try {
		const medidas = await produccionService.obtenerMedidas();
		res.json({
			success: true,
			medidas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerMedidas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene máquinas (opcionalmente filtradas por tipo)
 */
async function obtenerMaquinas(req, res) {
	try {
		const idTipoMaquina = req.query.id_tipo_maquina ? parseInt(req.query.id_tipo_maquina) : null;
		const maquinas = await produccionService.obtenerMaquinas(idTipoMaquina);
		res.json({
			success: true,
			maquinas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerMaquinas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene productos activos (opcionalmente filtrados por grupo)
 */
async function obtenerProductos(req, res) {
	try {
		const idGrupoProducto = req.query.id_grupo_producto ? parseInt(req.query.id_grupo_producto) : null;
		const productos = await produccionService.obtenerProductos(idGrupoProducto);
		res.json({
			success: true,
			productos
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProductos controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene usuarios activos
 */
async function obtenerUsuarios(req, res) {
	try {
		const usuarios = await produccionService.obtenerUsuarios();
		res.json({
			success: true,
			usuarios
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerUsuarios controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene catálogos necesarios para el registro de producción
 */
async function obtenerCatalogos(req, res) {
	try {
		const [turnos, medidas, usuarios] = await Promise.all([
			produccionService.obtenerTurnos(),
			produccionService.obtenerMedidas(),
			produccionService.obtenerUsuarios()
		]);

		// Determinar turno actual
		const turnoActual = await produccionService.determinarTurnoPorHora();

		res.json({
			success: true,
			catalogos: {
				turnos,
				medidas,
				usuarios,
				turnoActual
			}
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerCatalogos controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Determina el turno según la hora actual
 */
async function determinarTurno(req, res) {
	try {
		const turno = await produccionService.determinarTurnoPorHora();
		res.json({
			success: true,
			turno
		});
	} catch (error) {
		logger.error({ err: error }, "Error en determinarTurno controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Crea un nuevo registro de producción
 */
async function crearProduccion(req, res) {
	try {
		const datosProduccion = req.body;

		// Validaciones básicas
		if (!datosProduccion.id_producto) {
			return res.status(400).json({
				success: false,
				error: "El producto es requerido"
			});
		}

		if (!datosProduccion.id_maquina) {
			return res.status(400).json({
				success: false,
				error: "La máquina es requerida"
			});
		}

		if (!datosProduccion.id_usuario) {
			return res.status(400).json({
				success: false,
				error: "El usuario es requerido"
			});
		}

		if (!datosProduccion.id_turno) {
			return res.status(400).json({
				success: false,
				error: "El turno es requerido"
			});
		}

		const produccion = await produccionService.crearProduccion(datosProduccion);

		res.status(201).json({
			success: true,
			produccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearProduccion controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todas las producciones
 */
async function obtenerProducciones(req, res) {
	try {
		const producciones = await produccionService.obtenerProducciones();
		res.json({
			success: true,
			producciones
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProducciones controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene producciones con filtros aplicados
 */
async function obtenerProduccionesFiltradas(req, res) {
	try {
		// Parsear valores numéricos correctamente, asegurándose de que sean números válidos
		const parseId = (value) => {
			if (!value || value === '' || value === 'none' || value === 'null' || value === 'undefined') return null;
			const parsed = Number(value);
			return isNaN(parsed) ? null : parsed;
		};

		const filtros = {
			id_tipo_maquina: parseId(req.query.id_tipo_maquina),
			fecha_desde: req.query.fecha_desde && req.query.fecha_desde !== '' ? req.query.fecha_desde : null,
			fecha_hasta: req.query.fecha_hasta && req.query.fecha_hasta !== '' ? req.query.fecha_hasta : null,
			id_turno: parseId(req.query.id_turno),
			id_usuario: parseId(req.query.id_usuario),
			id_producto: parseId(req.query.id_producto)
		};

		// Validar que id_tipo_maquina sea requerido
		if (!filtros.id_tipo_maquina) {
			return res.status(400).json({
				success: false,
				error: "El tipo de máquina es requerido"
			});
		}

		// Obtener parámetros de paginación
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 50;

		logger.info({ 
			filtros, 
			pagina,
			limite,
			filtrosTypes: {
				id_tipo_maquina: typeof filtros.id_tipo_maquina,
				id_turno: typeof filtros.id_turno,
				id_usuario: typeof filtros.id_usuario,
				id_producto: typeof filtros.id_producto
			},
			query: req.query 
		}, "Recibida solicitud de producciones filtradas");

		const resultado = await produccionService.obtenerProduccionesFiltradas(filtros, pagina, limite);
		res.json({
			success: true,
			producciones: resultado.producciones,
			paginacion: resultado.paginacion
		});
	} catch (error) {
		logger.error({ err: error, stack: error.stack, filtros: req.query }, "Error en obtenerProduccionesFiltradas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene una producción por ID
 */
async function obtenerProduccionPorId(req, res) {
	try {
		const idProduccion = parseInt(req.params.id);
		const produccion = await produccionService.obtenerProduccionPorId(idProduccion);
		res.json({
			success: true,
			produccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerProduccionPorId controller");
		if (error.message === "Producción no encontrada") {
			return res.status(404).json({
				success: false,
				error: error.message
			});
		}
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Actualiza una producción (medidas: kilos, metros, etc.)
 */
async function actualizarProduccion(req, res) {
	try {
		const idProduccion = parseInt(req.params.id);
		const datos = req.body;
		const produccion = await produccionService.actualizarProduccion(idProduccion, datos);
		res.json({
			success: true,
			message: "Producción actualizada exitosamente",
			produccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en actualizarProduccion controller");
		if (error.message === "Producción no encontrada") {
			return res.status(404).json({
				success: false,
				error: error.message
			});
		}
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

module.exports = {
	obtenerTurnos,
	obtenerMedidas,
	obtenerMaquinas,
	obtenerProductos,
	obtenerUsuarios,
	obtenerCatalogos,
	determinarTurno,
	crearProduccion,
	obtenerProducciones,
	obtenerProduccionesFiltradas,
	obtenerProduccionPorId,
	actualizarProduccion
};

