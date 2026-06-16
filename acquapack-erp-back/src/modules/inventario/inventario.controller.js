const inventarioService = require("./inventario.service");
const { logger } = require("../../common/logger");

/**
 * POST /api/inventario/ajuste
 * Body: { tipo: 'aumento'|'salida', id_bodega, id_producto, cantidad, valor_unitario? }
 */
async function registrarAjuste(req, res) {
	try {
		const { tipo, id_bodega, id_producto, cantidad, valor_unitario } = req.body;
		const result = await inventarioService.registrarAjuste({
			tipo,
			id_bodega: id_bodega != null ? parseInt(id_bodega, 10) : null,
			id_producto: id_producto != null ? parseInt(id_producto, 10) : null,
			cantidad: cantidad != null ? parseFloat(cantidad) : null,
			valor_unitario: valor_unitario != null ? parseFloat(valor_unitario) : undefined,
		});
		res.json({
			success: true,
			message: result.message,
		});
	} catch (error) {
		logger.error({ err: error }, "Error en registrarAjuste");
		const msg = error.message || "Error al registrar el ajuste";
		if (msg.includes("Stock insuficiente") || msg.includes("obligatorios") || msg.includes("valor_unitario") || msg.includes("tipo debe")) {
			return res.status(400).json({ success: false, message: msg });
		}
		res.status(500).json({ success: false, message: msg });
	}
}

module.exports = {
	registrarAjuste,
};
