const nominaService = require("./nomina.service");
const emailService = require("../../common/email.service");
const multer = require("multer");
const { logger } = require("../../common/logger");

// Configurar multer para manejar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Obtiene todas las nóminas
 */
async function obtenerNominas(req, res) {
	try {
		const nominas = await nominaService.obtenerNominas();
		res.json({
			success: true,
			nominas
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerNominas controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene una nómina por ID con todos sus detalles
 */
async function obtenerNominaPorId(req, res) {
	try {
		const { id } = req.params;
		const nomina = await nominaService.obtenerNominaPorId(parseInt(id));
		res.json({
			success: true,
			nomina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerNominaPorId controller");
		
		if (error.message === "Nómina no encontrada") {
			return res.status(404).json({
				success: false,
				error: "No encontrado",
				message: error.message
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
 * Crea una nueva nómina
 */
async function crearNomina(req, res) {
	try {
		// Obtener id_usuario_creador del header o del body
		const idUsuarioCreador = req.headers['x-user-id'] 
			? parseInt(req.headers['x-user-id']) 
			: (req.body.id_usuario_creador ? parseInt(req.body.id_usuario_creador) : null);

		if (!idUsuarioCreador) {
			return res.status(400).json({
				success: false,
				error: "No se pudo identificar al usuario creador"
			});
		}

		const datosNomina = {
			...req.body,
			id_usuario_creador: idUsuarioCreador
		};

		const nomina = await nominaService.crearNomina(datosNomina);
		res.status(201).json({
			success: true,
			nomina
		});
	} catch (error) {
		logger.error({ err: error }, "Error en crearNomina controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los trabajadores
 */
async function obtenerTrabajadores(req, res) {
	try {
		const trabajadores = await nominaService.obtenerTrabajadores();
		res.json({
			success: true,
			trabajadores
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTrabajadores controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene los estados de nómina
 */
async function obtenerEstadosNomina(req, res) {
	try {
		const estados = await nominaService.obtenerEstadosNomina();
		res.json({
			success: true,
			estados
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerEstadosNomina controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los tipos de hora
 */
async function obtenerTiposHora(req, res) {
	try {
		const tiposHora = await nominaService.obtenerTiposHora();
		res.json({
			success: true,
			tiposHora
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposHora controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Obtiene todos los tipos de deducción
 */
async function obtenerTiposDeduccion(req, res) {
	try {
		const tiposDeduccion = await nominaService.obtenerTiposDeduccion();
		res.json({
			success: true,
			tiposDeduccion
		});
	} catch (error) {
		logger.error({ err: error }, "Error en obtenerTiposDeduccion controller");
		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message
		});
	}
}

/**
 * Envía la nómina por email al trabajador
 */
async function enviarNominaPorEmail(req, res) {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				error: "Archivo requerido",
				message: "Debe proporcionar el archivo PDF de la nómina"
			});
		}

		const { id_nomina, nombre_trabajador, total_pagar } = req.body;

		if (!id_nomina) {
			return res.status(400).json({
				success: false,
				error: "Campo requerido faltante",
				message: "Debe proporcionar el ID de la nómina"
			});
		}

		// Validar que el archivo sea un PDF
		if (req.file.mimetype !== "application/pdf" && !req.file.originalname.endsWith(".pdf")) {
			logger.warn({ mimetype: req.file.mimetype, originalname: req.file.originalname }, "Archivo no es PDF");
		}

		// Validar que el buffer tenga contenido
		if (!req.file.buffer || req.file.buffer.length === 0) {
			return res.status(400).json({
				success: false,
				error: "Archivo vacío",
				message: "El archivo PDF está vacío o no se pudo leer correctamente"
			});
		}

		logger.info({ 
			fileSize: req.file.buffer.length, 
			mimetype: req.file.mimetype,
			originalname: req.file.originalname,
			id_nomina 
		}, "Procesando envío de nómina por email");

		// Obtener el email del trabajador
		const emailTrabajador = await nominaService.obtenerEmailTrabajador(parseInt(id_nomina));

		if (!emailTrabajador) {
			return res.status(400).json({
				success: false,
				error: "Email no encontrado",
				message: "El trabajador no tiene un correo electrónico registrado. Por favor, verifique que el usuario tenga un correo electrónico en su perfil."
			});
		}

		logger.info({ email: emailTrabajador, id_nomina }, "Email del trabajador obtenido");

		// Formatear el total a pagar
		const formatearMoneda = (valor) => {
			const num = typeof valor === "string" ? parseFloat(valor) : valor;
			return new Intl.NumberFormat("es-CO", {
				style: "currency",
				currency: "COP",
				minimumFractionDigits: 0,
			}).format(num || 0);
		};

		const totalFormateado = formatearMoneda(parseFloat(total_pagar || 0));

		// Crear el contenido del email
		const html = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<style>
					body {
						font-family: Arial, sans-serif;
						line-height: 1.6;
						color: #333;
					}
					.container {
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
					}
					.header {
						background-color: #4CAF50;
						color: white;
						padding: 20px;
						text-align: center;
						border-radius: 5px 5px 0 0;
					}
					.content {
						background-color: #f9f9f9;
						padding: 20px;
						border-radius: 0 0 5px 5px;
					}
					.info-box {
						background-color: white;
						padding: 15px;
						margin: 15px 0;
						border-left: 4px solid #4CAF50;
						border-radius: 4px;
					}
					.total {
						font-size: 18px;
						font-weight: bold;
						color: #4CAF50;
						margin-top: 20px;
					}
					.footer {
						margin-top: 20px;
						padding-top: 20px;
						border-top: 1px solid #ddd;
						font-size: 12px;
						color: #666;
						text-align: center;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Nómina de Pago</h1>
					</div>
					<div class="content">
						<p>Estimado/a <strong>${nombre_trabajador || "Trabajador"}</strong>,</p>
						
						<p>Le informamos que su nómina de pago ha sido generada y está disponible para su revisión.</p>
						
						<div class="info-box">
							<p><strong>Nómina N°:</strong> ${id_nomina}</p>
							<p><strong>Total a Pagar:</strong> ${totalFormateado}</p>
						</div>
						
						<p>Puede encontrar el detalle completo de su nómina en el archivo PDF adjunto.</p>
						
						<p class="total">Total a Pagar: ${totalFormateado}</p>
						
						<p>Si tiene alguna pregunta o necesita aclaración, por favor no dude en contactarnos.</p>
						
						<div class="footer">
							<p>Este es un mensaje automático, por favor no responda a este correo.</p>
							<p>&copy; ${new Date().getFullYear()} Acquapack ERP. Todos los derechos reservados.</p>
						</div>
					</div>
				</div>
			</body>
			</html>
		`;

		// Asegurarse de que el buffer sea un Buffer de Node.js
		let pdfBuffer = req.file.buffer;
		if (!Buffer.isBuffer(pdfBuffer)) {
			pdfBuffer = Buffer.from(pdfBuffer);
		}

		// Limpiar nombre del trabajador para el nombre del archivo
		const nombreArchivo = nombre_trabajador 
			? nombre_trabajador.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "")
			: "N/A";

		// Enviar el email
		logger.info({ 
			to: emailTrabajador, 
			bufferSize: pdfBuffer.length,
			fileName: `Nomina_${id_nomina}_${nombreArchivo}.pdf`
		}, "Enviando email con PDF adjunto");

		const resultado = await emailService.enviarEmailConPDF({
			to: emailTrabajador,
			subject: `Nómina de Pago #${id_nomina} - ${nombre_trabajador || "Trabajador"}`,
			html: html,
			pdfBuffer: pdfBuffer,
			pdfFileName: `Nomina_${id_nomina}_${nombreArchivo}.pdf`
		});

		res.json({
			success: true,
			message: "Nómina enviada por email correctamente",
			email: emailTrabajador,
			messageId: resultado.messageId
		});
	} catch (error) {
		logger.error({ err: error }, "Error en enviarNominaPorEmail controller");
		
		if (error.message === "Nómina no encontrada") {
			return res.status(404).json({
				success: false,
				error: "No encontrado",
				message: error.message
			});
		}

		if (error.message.includes("Configuración de email")) {
			return res.status(500).json({
				success: false,
				error: "Configuración de email faltante",
				message: error.message
			});
		}

		if (error.message.includes("Email no encontrado") || error.message.includes("correo electrónico")) {
			return res.status(400).json({
				success: false,
				error: "Email no encontrado",
				message: error.message
			});
		}

		// Log del error completo para debugging
		logger.error({ 
			err: error, 
			stack: error.stack,
			id_nomina: req.body?.id_nomina 
		}, "Error detallado en enviarNominaPorEmail");

		res.status(500).json({
			success: false,
			error: "Error interno del servidor",
			message: error.message || "Error desconocido al enviar el email. Verifique la configuración de SMTP."
		});
	}
}

module.exports = {
	obtenerTrabajadores,
	obtenerEstadosNomina,
	obtenerTiposHora,
	obtenerTiposDeduccion,
	crearNomina,
	obtenerNominas,
	obtenerNominaPorId,
	enviarNominaPorEmail,
	upload
};
