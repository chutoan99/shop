import EnvConfig from '@configs/env.config'
import dotenv from 'dotenv'
import nodemailer, { Transporter } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
dotenv.config()

export interface IEmailConfig {
	subject: string
	content: string
	template: string
}

export class MailService {
	private transporter: Transporter<SMTPTransport.SentMessageInfo>

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: EnvConfig.email.user,
				pass: EnvConfig.email.pass
			}
		})
	}

	async send(
		email: string,
		config: IEmailConfig
	): Promise<SMTPTransport.SentMessageInfo> {
		const mailOptions: Mail.Options = {
			from: EnvConfig.email.user,
			to: email,
			subject: config.subject,
			text: config.content,
			html: config.template
		}

		const info: SMTPTransport.SentMessageInfo =
			await this.transporter.sendMail(mailOptions)
		console.log(info, 'Email sent successfully')
		return info
	}
}
