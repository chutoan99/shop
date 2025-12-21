import ForgotPasswordEvent from '../events/forgot-password.event'
import { MailService } from '@core/libs/mail/mail.service'
import LoggerService from '@core/libs/logger/logger.system'
import templateResetPassword from '../emails/reset.template'
import { BaseEventService } from '@core/libs/event'
import RedisPubSubService from '@core/libs/redis/redis-pub-sub.service'

export default class SendEmailForgotPasswordListeners extends BaseEventService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _mailService: MailService
	) {
		super()
	}

	async execute(evt: ForgotPasswordEvent) {
		const payload = evt.payload

		try {
			const result: any = await this._mailService.send(payload?.email, {
				subject: 'Update password',
				content: 'You received message from ' + payload?.email,
				template: templateResetPassword(
					payload?.email,
					evt.payload.token
				)
			})

			this._loggerService.warn(JSON.stringify(result))
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	subscribe() {
		RedisPubSubService.getInstance().subscribe(
			'forgot-password',
			(msg: string) => {
				const data = JSON.parse(msg)
				const evt = ForgotPasswordEvent.from(data)
				this.execute(evt)
			}
		)
	}
}
