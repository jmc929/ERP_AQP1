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
const { configuracionNominaRouter } = require("../modules/configuracion-nomina");
const { configuracionProduccionRouter } = require("../modules/configuracion-produccion");
const { produccionRouter } = require("../modules/produccion");
const { nominaRouter } = require("../modules/nomina");
const { tareasRoutes } = require("../modules/tareas");
const { proveedoresRoutes } = require("../modules/proveedores");
const { clientesRoutes } = require("../modules/clientes");
const { bodegasRoutes } = require("../modules/bodegas");
const { ventasRouter } = require("../modules/ventas");
const { notasRoutes } = require("../modules/notas");
const { cajasRouter } = require("../modules/cajas");
const { configuracionCajasRouter } = require("../modules/configuracion-cajas");
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
routes.use("/configuracion-nomina", configuracionNominaRouter);
routes.use("/configuracion-produccion", configuracionProduccionRouter);
routes.use("/produccion", produccionRouter);
routes.use("/nomina", nominaRouter);
routes.use("/tareas", tareasRoutes);
routes.use("/proveedores", proveedoresRoutes);
routes.use("/clientes", clientesRoutes);
routes.use("/bodegas", bodegasRoutes);
routes.use("/ventas", ventasRouter);
routes.use("/notas", notasRoutes);
routes.use("/cajas", cajasRouter);
routes.use("/configuracion-cajas", configuracionCajasRouter);

// Log para verificar que las rutas se cargaron
logger.info("Rutas cargadas: /health, /compras, /auth, /usuarios, /productos, /configuracion-productos, /configuracion-usuarios, /configuracion-proveedores, /configuracion-clientes, /configuracion-nomina, /configuracion-produccion, /produccion, /nomina, /tareas, /proveedores, /clientes, /bodegas, /ventas, /notas, /cajas, /configuracion-cajas");

module.exports = { routes };

