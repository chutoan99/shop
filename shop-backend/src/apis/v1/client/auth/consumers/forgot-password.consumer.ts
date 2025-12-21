import { MailService } from '@core/libs/mail/mail.service'

import SendEmailForgotPasswordListeners from '../listeners/send-email-forgot-password.listeners'
import { ServiceContext } from 'src/server'
export const ForgotPasswordConsumer = (sctx: ServiceContext) => {
	const mailService = new MailService()
	new SendEmailForgotPasswordListeners(
		sctx.loggerService,
		mailService
	).subscribe()
}

export default ForgotPasswordConsumer
