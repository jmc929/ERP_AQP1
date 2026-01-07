const ventasService = require("./ventas.service");
const { logger } = require("../../common/logger");

async function calcularValorTotal(req, res) {
  try {
    const { cantidad, valorUnitario, descuento, descuentoEnPorcentaje, idIva, idRetencion } = req.body;

    // Validar que los campos requeridos estén presentes
    if (
      cantidad === undefined ||
      valorUnitario === undefined ||
      descuento === undefined ||
      descuentoEnPorcentaje === undefined
    ) {
      return res.status(400).json({
        error: "Faltan campos requeridos",
        campos: ["cantidad", "valorUnitario", "descuento", "descuentoEnPorcentaje"],
      });
    }

    // Calcular subtotal: cantidad × valor unitario
    let subtotal = cantidad * valorUnitario;

    // Aplicar descuento
    let montoDescuento = 0;
    if (descuentoEnPorcentaje) {
      // Si el descuento es en porcentaje, calcular el monto del descuento
      montoDescuento = (subtotal * descuento) / 100;
    } else {
      // Si el descuento es un valor fijo
      montoDescuento = descuento;
    }
    subtotal = subtotal - montoDescuento;

    // Guardar el subtotal después del descuento para calcular impuestos
    const subtotalDespuesDescuento = subtotal;

    // Obtener valor del IVA desde la BD si está seleccionado
    let ivaMonto = 0;
    let porcentajeIva = 0;
    if (idIva) {
      const ivas = await ventasService.obtenerIvas();
      const ivaSeleccionado = ivas.find(i => i.id_iva === parseInt(idIva));
      if (ivaSeleccionado) {
        porcentajeIva = parseFloat(ivaSeleccionado.valor) || 0;
        ivaMonto = (subtotalDespuesDescuento * porcentajeIva) / 100;
        subtotal = subtotal + ivaMonto;
      }
    }

    // Obtener valor de la retención desde la BD si está seleccionada
    let retencionMonto = 0;
    let porcentajeRetencion = 0;
    if (idRetencion) {
      const retenciones = await ventasService.obtenerRetenciones();
      const retencionSeleccionada = retenciones.find(r => r.id_retefuente === parseInt(idRetencion));
      if (retencionSeleccionada) {
        porcentajeRetencion = parseFloat(retencionSeleccionada.valor) || 0;
        retencionMonto = (subtotalDespuesDescuento * porcentajeRetencion) / 100;
        subtotal = subtotal - retencionMonto;
      }
    }

    // Redondear a 2 decimales
    const valorTotal = Math.round(subtotal * 100) / 100;

    res.json({
      valorTotal,
      desglose: {
        subtotalInicial: cantidad * valorUnitario,
        descuento,
        descuentoEnPorcentaje,
        montoDescuento,
        subtotalDespuesDescuento: (cantidad * valorUnitario) - montoDescuento,
        idIva,
        porcentajeIva,
        ivaMonto: Math.round(ivaMonto * 100) / 100,
        idRetencion,
        porcentajeRetencion,
        retencionMonto: Math.round(retencionMonto * 100) / 100,
        valorTotal,
      },
    });
  } catch (error) {
    logger.error({ err: error }, "Error en calcularValorTotal");
    res.status(500).json({
      error: "Error al calcular el valor total",
      mensaje: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

async function obtenerSiguienteIdSalida(req, res) {
  try {
    const siguienteId = await ventasService.obtenerSiguienteIdSalida();
    res.json({
      success: true,
      siguienteId: siguienteId
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerSiguienteIdSalida");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerClientes(req, res) {
  try {
    const clientes = await ventasService.obtenerClientes();
    res.json({
      success: true,
      clientes: clientes
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerClientes");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerProductos(req, res) {
  try {
    const idBodega = parseInt(req.query.id_bodega) || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const busqueda = req.query.busqueda || "";
    
    if (!idBodega) {
      return res.status(400).json({
        success: false,
        error: "El parámetro id_bodega es requerido"
      });
    }
    
    const resultado = await ventasService.obtenerProductos(idBodega, page, limit, busqueda);
    res.json({
      success: true,
      productos: resultado.productos,
      paginacion: resultado.paginacion
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerProductos");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerBodegas(req, res) {
  try {
    const bodegas = await ventasService.obtenerBodegas();
    res.json({
      success: true,
      bodegas: bodegas
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerBodegas");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerIvas(req, res) {
  try {
    const ivas = await ventasService.obtenerIvas();
    res.json({
      success: true,
      ivas: ivas
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerIvas");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerRetenciones(req, res) {
  try {
    const retenciones = await ventasService.obtenerRetenciones();
    res.json({
      success: true,
      retenciones: retenciones
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerRetenciones");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function crearSalida(req, res) {
  try {
    const {
      id_usuario,
      fecha_creacion,
      id_cliente,
      detalles
    } = req.body;

    // Validaciones básicas
    if (!id_usuario) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "El id_usuario es obligatorio"
      });
    }

    if (!fecha_creacion) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "La fecha de creación es obligatoria"
      });
    }

    if (!id_cliente) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "El cliente es obligatorio"
      });
    }

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "Debe haber al menos un detalle de producto"
      });
    }

    // Calcular totales
    const total_subtotal = detalles.reduce((sum, d) => {
      const subtotal = (parseFloat(d.cantidad) || 0) * (parseFloat(d.precio_unitario) || 0);
      return sum + subtotal;
    }, 0);

    const total_descuento = detalles.reduce((sum, d) => sum + (parseFloat(d.descuento) || 0), 0);
    const total_iva = detalles.reduce((sum, d) => sum + (parseFloat(d.iva_valor) || 0), 0);
    const total_retencion = detalles.reduce((sum, d) => sum + (parseFloat(d.retefuente_valor) || 0), 0);
    const total_factura = detalles.reduce((sum, d) => sum + (parseFloat(d.valor_total) || 0), 0);

    const resultado = await ventasService.crearSalida({
      id_usuario: parseInt(id_usuario),
      fecha_creacion,
      id_cliente: parseInt(id_cliente),
      total_subtotal,
      total_descuento,
      total_iva,
      total_retencion,
      total_factura,
      detalles: detalles.map(d => ({
        id_producto: parseInt(d.id_producto),
        id_bodega: parseInt(d.id_bodega),
        cantidad: parseFloat(d.cantidad),
        precio_unitario: parseFloat(d.precio_unitario),
        descuento: parseFloat(d.descuento) || 0,
        subtotal: parseFloat(d.subtotal) || 0,
        id_iva: d.id_iva ? parseInt(d.id_iva) : null,
        iva_valor: parseFloat(d.iva_valor) || 0,
        id_retefuente: d.id_retefuente ? parseInt(d.id_retefuente) : null,
        retefuente_valor: parseFloat(d.retefuente_valor) || 0,
        valor_total: parseFloat(d.valor_total) || 0
      }))
    });

    res.status(201).json({
      success: true,
      message: "Salida creada exitosamente",
      salida: resultado.salida,
      detalles: resultado.detalles
    });
  } catch (error) {
    logger.error({ err: error }, "Error en crearSalida");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerSalidas(req, res) {
  try {
    const salidas = await ventasService.obtenerSalidas();
    res.status(200).json({
      success: true,
      salidas
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerSalidas");
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerDetalleSalida(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "ID de salida inválido"
      });
    }

    const detalleSalida = await ventasService.obtenerDetalleSalida(parseInt(id));
    res.status(200).json({
      success: true,
      ...detalleSalida
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerDetalleSalida");
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

module.exports = {
  calcularValorTotal,
  obtenerSiguienteIdSalida,
  obtenerClientes,
  obtenerProductos,
  obtenerBodegas,
  obtenerIvas,
  obtenerRetenciones,
  crearSalida,
  obtenerSalidas,
  obtenerDetalleSalida
};

