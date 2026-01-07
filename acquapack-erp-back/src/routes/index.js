const express = require("express");
const { healthRouter } = require("../modules/health");
const { comprasRouter } = require("../modules/compras");
const { authRouter } = require("../modules/auth");
const { usuariosRouter } = require("../modules/usuarios");
const { productosRouter } = require("../modules/productos");
const { configuracionProductosRouter } = require("../modules/configuracion-productos");
const { configuracionUsuariosRoutes } = require("../modules/configuracion-usuarios");
const { configuracionProveedoresRoutes } = require("../modules/configuracion-proveedores");
const { configuracionClientesRoutes } = require("../modules/configuracion-clientes");
const { tareasRoutes } = require("../modules/tareas");
const { proveedoresRoutes } = require("../modules/proveedores");
const { clientesRoutes } = require("../modules/clientes");
const { bodegasRoutes } = require("../modules/bodegas");
const { ventasRouter } = require("../modules/ventas");
const { logger } = require("../common/logger");

const routes = express.Router();

routes.use("/health", healthRouter);
routes.use("/compras", comprasRouter);
routes.use("/auth", authRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/productos", productosRouter);
routes.use("/configuracion-productos", configuracionProductosRouter);
routes.use("/configuracion-usuarios", configuracionUsuariosRoutes);
routes.use("/configuracion-proveedores", configuracionProveedoresRoutes);
routes.use("/configuracion-clientes", configuracionClientesRoutes);
routes.use("/tareas", tareasRoutes);
routes.use("/proveedores", proveedoresRoutes);
routes.use("/clientes", clientesRoutes);
routes.use("/bodegas", bodegasRoutes);
routes.use("/ventas", ventasRouter);

// Log para verificar que las rutas se cargaron
logger.info("Rutas cargadas: /health, /compras, /auth, /usuarios, /productos, /configuracion-productos, /configuracion-usuarios, /configuracion-proveedores, /configuracion-clientes, /tareas, /proveedores, /clientes, /bodegas, /ventas");

module.exports = { routes };

