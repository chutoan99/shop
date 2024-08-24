import WriteLogger from '~/configs/winston.config'

export class LoggerSystem {
	public error = (err: any) => {
		WriteLogger.log({
			level: 'error',
			message: err.message
		})
	}
}
