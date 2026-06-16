const { pool } = require("../../config/db");
const { logger } = require("../../common/logger");

/**
 * Registra un ajuste de inventario (aumento o salida).
 * - Aumento: INSERT en inventario + movimientos_kardex (Ajuste Entrada).
 * - Salida: solo INSERT en movimientos_kardex (Ajuste Salida), con costo promedio.
 * @param {Object} params
 * @param {string} params.tipo - 'aumento' | 'salida'
 * @param {number} params.id_bodega
 * @param {number} params.id_producto
 * @param {number} params.cantidad
 * @param {number} [params.valor_unitario] - obligatorio solo para tipo 'aumento'
 */
async function registrarAjuste({ tipo, id_bodega, id_producto, cantidad, valor_unitario }) {
	const client = await pool.connect();
	try {
		if (!["aumento", "salida"].includes(tipo)) {
			throw new Error("tipo debe ser 'aumento' o 'salida'");
		}
		if (!id_bodega || !id_producto || !cantidad || cantidad <= 0) {
			throw new Error("id_bodega, id_producto y cantidad (positiva) son obligatorios");
		}
		if (tipo === "aumento" && (valor_unitario == null || valor_unitario < 0)) {
			throw new Error("En ajuste por aumento debe enviar valor_unitario >= 0");
		}

		if (tipo === "salida") {
			// Stock disponible = SUM(inventario.cantidad_lote) - SUM(mk salidas)
			const stockResult = await client.query(
				`SELECT
					COALESCE(SUM(inv.cantidad_lote), 0) as total_entrada,
					COALESCE((
						SELECT SUM(mk.cantidad)
						FROM public.movimientos_kardex mk
						WHERE mk.id_bodega = $1 AND mk.id_producto = $2 AND mk.tipo_flujo = 'Salida'
					), 0) as total_salida
				FROM public.inventario inv
				WHERE inv.id_bodega = $1 AND inv.id_producto = $2`,
				[id_bodega, id_producto]
			);
			const totalEntrada = parseFloat(stockResult.rows[0]?.total_entrada || 0);
			const totalSalida = parseFloat(stockResult.rows[0]?.total_salida || 0);
			const stockDisponible = totalEntrada - totalSalida;
			if (cantidad > stockDisponible) {
				throw new Error(`Stock insuficiente. Disponible: ${stockDisponible.toFixed(2)}`);
			}
			// Costo promedio para la salida (valoración)
			const costoResult = await client.query(
				`SELECT
					COALESCE(SUM(inv.costo_producto), 0) / NULLIF(SUM(inv.cantidad_lote), 0) as costo_promedio
				FROM public.inventario inv
				WHERE inv.id_bodega = $1 AND inv.id_producto = $2`,
				[id_bodega, id_producto]
			);
			const costoUnitario = parseFloat(costoResult.rows[0]?.costo_promedio || 0);
			const costoTotal = costoUnitario * cantidad;

			await client.query(
				`INSERT INTO public.movimientos_kardex (
					id_bodega, id_producto, tipo_movimiento, tipo_flujo, cantidad, costo_unitario, costo_total_movimiento, "fecha "
				) VALUES ($1, $2, 'Ajuste Salida', 'Salida', $3, $4, $5, NOW())`,
				[id_bodega, id_producto, cantidad, costoUnitario, costoTotal]
			);
			logger.info({ tipo, id_bodega, id_producto, cantidad }, "Ajuste salida registrado");
			return { success: true, message: "Ajuste por salida registrado correctamente." };
		}

		// tipo === 'aumento': transacción para inventario + kardex
		await client.query("BEGIN");
		try {
			const costoTotalLote = valor_unitario * cantidad;
			const insertInv = await client.query(
				`INSERT INTO public.inventario (
					id_bodega, id_producto, id_proveedor, fecha_ingreso, id_factura, cantidad_lote, costo_producto
				) VALUES ($1, $2, NULL, NOW(), NULL, $3, $4)
				RETURNING id_inventario`,
				[id_bodega, id_producto, cantidad, costoTotalLote]
			);
			if (insertInv.rows.length === 0) {
				throw new Error("No se pudo crear el registro en inventario");
			}
			await client.query(
				`INSERT INTO public.movimientos_kardex (
					id_bodega, id_producto, tipo_movimiento, tipo_flujo, cantidad, costo_unitario, costo_total_movimiento, "fecha "
				) VALUES ($1, $2, 'Ajuste Entrada', 'Entrada', $3, $4, $5, NOW())`,
				[id_bodega, id_producto, cantidad, valor_unitario, costoTotalLote]
			);
			await client.query("COMMIT");
			logger.info({ tipo, id_bodega, id_producto, cantidad, id_inventario: insertInv.rows[0].id_inventario }, "Ajuste entrada registrado");
			return { success: true, message: "Ajuste por aumento registrado correctamente." };
		} catch (err) {
			await client.query("ROLLBACK");
			throw err;
		}
	} finally {
		client.release();
	}
}

module.exports = {
	registrarAjuste,
};
