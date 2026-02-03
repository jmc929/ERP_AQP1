const express = require("express");
const {
	obtenerTiposMaquina,
	crearTipoMaquina,
	actualizarTipoMaquina,
	eliminarTipoMaquina,
	obtenerMaquinas,
	crearMaquina,
	actualizarMaquina,
	eliminarMaquina
} = require("./configuracion-produccion.controller");

const configuracionProduccionRoutes = express.Router();

// Rutas para tipo_maquina
configuracionProduccionRoutes.get("/tipo-maquina", obtenerTiposMaquina);
configuracionProduccionRoutes.post("/tipo-maquina", crearTipoMaquina);
configuracionProduccionRoutes.put("/tipo-maquina/:id", actualizarTipoMaquina);
configuracionProduccionRoutes.delete("/tipo-maquina/:id", eliminarTipoMaquina);

// Rutas para maquinas
configuracionProduccionRoutes.get("/maquina", obtenerMaquinas);
configuracionProduccionRoutes.post("/maquina", crearMaquina);
configuracionProduccionRoutes.put("/maquina/:id", actualizarMaquina);
configuracionProduccionRoutes.delete("/maquina/:id", eliminarMaquina);

module.exports = { configuracionProduccionRoutes };

