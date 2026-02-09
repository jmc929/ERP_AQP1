const nodemailer = require("nodemailer");
const { logger } = require("./logger");
const { env } = require("../config/env");

/**
 * Servicio para envío de emails
 */
class EmailService {
	constructor() {
		// Configurar el transporter de nodemailer
		// Por defecto usa Gmail, pero se puede configurar para otros proveedores
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || "smtp.gmail.com",
			port: Number(process.env.SMTP_PORT || 587),
			secure: process.env.SMTP_SECURE === "true", // true para 465, false para otros puertos
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		});
	}

	/**
	 * Envía un email con un PDF adjunto
	 * @param {Object} options - Opciones del email
	 * @param {string} options.to - Email del destinatario
	 * @param {string} options.subject - Asunto del email
	 * @param {string} options.html - Cuerpo del email en HTML
	 * @param {Buffer} options.pdfBuffer - Buffer del PDF a adjuntar
	 * @param {string} options.pdfFileName - Nombre del archivo PDF
	 * @returns {Promise<Object>} Resultado del envío
	 */
	async enviarEmailConPDF({ to, subject, html, pdfBuffer, pdfFileName }) {
		try {
			// Si no hay configuración de email, retornar error
			if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
				throw new Error("Configuración de email no encontrada. Configure SMTP_USER y SMTP_PASS en las variables de entorno.");
			}

			const mailOptions = {
				from: `"Acquapack ERP" <${process.env.SMTP_USER}>`,
				to: to,
				subject: subject,
				html: html,
				attachments: [
					{
						filename: pdfFileName,
						content: pdfBuffer,
						contentType: "application/pdf"
					}
				]
			};

			const info = await this.transporter.sendMail(mailOptions);
			logger.info({ messageId: info.messageId, to }, "Email enviado exitosamente");
			return { success: true, messageId: info.messageId };
		} catch (error) {
			logger.error({ err: error, to }, "Error al enviar email");
			throw error;
		}
	}

	/**
	 * Verifica la conexión con el servidor SMTP
	 * @returns {Promise<boolean>} true si la conexión es exitosa
	 */
	async verificarConexion() {
		try {
			if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
				return false;
			}
			await this.transporter.verify();
			return true;
		} catch (error) {
			logger.error({ err: error }, "Error al verificar conexión SMTP");
			return false;
		}
	}
}

module.exports = new EmailService();

