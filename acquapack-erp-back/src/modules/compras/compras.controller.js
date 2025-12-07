function calcularValorTotal(req, res) {
  try {
    const { cantidad, valorUnitario, descuento, descuentoEnPorcentaje, iva19, impuestoRetencion } = req.body;

    // Validar que los campos requeridos estén presentes
    if (
      cantidad === undefined ||
      valorUnitario === undefined ||
      descuento === undefined ||
      descuentoEnPorcentaje === undefined ||
      iva19 === undefined ||
      impuestoRetencion === undefined
    ) {
      return res.status(400).json({
        error: "Faltan campos requeridos",
        campos: ["cantidad", "valorUnitario", "descuento", "descuentoEnPorcentaje", "iva19", "impuestoRetencion"],
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

    // Aplicar IVA 19% si está marcado
    if (iva19) {
      subtotal = subtotal * 1.19;
    }

    // Aplicar impuesto de retención 2.5% si está marcado
    // Se suma el 2.5% del valor unitario por cada unidad
    if (impuestoRetencion) {
      const retencion = (valorUnitario * 0.025) * cantidad;
      subtotal = subtotal + retencion;
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
        ivaAplicado: iva19,
        ivaMonto: iva19 ? ((cantidad * valorUnitario) - montoDescuento) * 0.19 : 0,
        retencionAplicada: impuestoRetencion,
        retencionMonto: impuestoRetencion ? (valorUnitario * 0.025) * cantidad : 0,
        valorTotal,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al calcular el valor total",
      mensaje: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

module.exports = { calcularValorTotal };

