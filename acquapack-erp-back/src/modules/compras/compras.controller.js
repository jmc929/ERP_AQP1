const comprasService = require("./compras.service");
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
      const iva = await comprasService.obtenerIvas();
      const ivaSeleccionado = iva.find(i => i.id_iva === parseInt(idIva));
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
      const retenciones = await comprasService.obtenerRetenciones();
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

async function obtenerSiguienteIdFactura(req, res) {
  try {
    const siguienteId = await comprasService.obtenerSiguienteIdFactura();
    res.json({
      success: true,
      siguienteId: siguienteId
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerSiguienteIdFactura");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerProveedores(req, res) {
  try {
    const proveedores = await comprasService.obtenerProveedores();
    res.json({
      success: true,
      proveedores: proveedores
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerProveedores");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerProveedoresPaginados(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const busqueda = req.query.busqueda || "";

    const resultado = await comprasService.obtenerProveedoresPaginados(page, limit, busqueda);
    res.json({
      success: true,
      proveedores: resultado.proveedores,
      paginacion: resultado.paginacion
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerProveedoresPaginados");
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerProductos(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const busqueda = req.query.busqueda || "";
    
    const resultado = await comprasService.obtenerProductos(page, limit, busqueda);
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
    const bodegas = await comprasService.obtenerBodegas();
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
    const ivas = await comprasService.obtenerIvas();
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
    const retenciones = await comprasService.obtenerRetenciones();
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

async function crearFactura(req, res) {
  try {
    const {
      id_usuarios,
      fecha_creacion,
      id_proveedor,
      numeroFacturaLetras,
      numeroFacturaNumeros,
      observaciones,
      descuentoEnPorcentaje,
      detalles
    } = req.body;

    // Validaciones básicas
    if (!id_usuarios) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "El id_usuarios es obligatorio"
      });
    }

    if (!fecha_creacion) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "La fecha de creación es obligatoria"
      });
    }

    if (!id_proveedor) {
      return res.status(400).json({
        error: "Campo requerido faltante",
        message: "El proveedor es obligatorio"
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

    const resultado = await comprasService.crearFactura({
      id_usuarios: parseInt(id_usuarios),
      fecha_creacion,
      id_proveedor: parseInt(id_proveedor),
      numeroFacturaLetras: numeroFacturaLetras || "",
      numeroFacturaNumeros: numeroFacturaNumeros || "",
      observaciones: observaciones || null,
      descuentoEnPorcentaje: descuentoEnPorcentaje || false,
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
      message: "Factura creada exitosamente",
      factura: resultado.factura,
      detalles: resultado.detalles
    });
  } catch (error) {
    logger.error({ err: error }, "Error en crearFactura");
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerFacturas(req, res) {
  try {
    const facturas = await comprasService.obtenerFacturas();
    res.status(200).json({
      success: true,
      facturas
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerFacturas");
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerDetalleFactura(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "ID de factura inválido"
      });
    }

    const detalleFactura = await comprasService.obtenerDetalleFactura(parseInt(id));
    res.status(200).json({
      success: true,
      ...detalleFactura
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerDetalleFactura");
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

async function obtenerProductosXProveedor(req, res) {
  try {
    const { id_proveedor } = req.query;
    const idProveedor = id_proveedor ? parseInt(id_proveedor) : null;
    
    const productosXProveedor = await comprasService.obtenerProductosXProveedor(idProveedor);
    res.status(200).json({
      success: true,
      productosXProveedor
    });
  } catch (error) {
    logger.error({ err: error }, "Error en obtenerProductosXProveedor");
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
}

module.exports = {
  calcularValorTotal,
  obtenerSiguienteIdFactura,
  obtenerProveedores,
  obtenerProveedoresPaginados,
  obtenerProductos,
  obtenerBodegas,
  obtenerIvas,
  obtenerRetenciones,
  crearFactura,
  obtenerFacturas,
  obtenerDetalleFactura,
  obtenerProductosXProveedor
};

