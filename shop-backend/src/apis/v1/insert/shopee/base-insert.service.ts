import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'

export abstract class BaseInsertService<T> {
	protected constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService
	) {}

	public Insert(store: string, data: T[]): void {
		try {
			this._loggerService.info(`${store}  ${JSON.stringify(data)}`)

			this._mySQLService.execute(store, [JSON.stringify(data)])
		} catch (error: any) {
			this._loggerService.error(error)
			throw new Error(error.message || error)
		}
	}
}
