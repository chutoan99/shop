import LoggerService from '@core/libs/logger/logger.system'
import { ResultResponse } from '@core/libs/mysql'
import MySQLService from '@core/libs/mysql/mysql.service'
import { FieldPacket, ResultSetHeader } from 'mysql2'

export class BaseRepository {
	static readonly ROWS_AFFECTED_SUCCESS = 1

	constructor(
		protected readonly _logger: LoggerService,
		protected readonly _db: MySQLService
	) {}

	protected async callProcedure<T = any>(
		store: string,
		params: any[] = []
	): Promise<T> {
		try {
			this._logger.info(
				`Executing: ${store}, params: ${JSON.stringify(params)}`
			)
			const [response]: ResultResponse = await this._db.query(
				store,
				params
			)
			return response as T
		} catch (error: any) {
			this._logger.error(error)
			throw new Error(error.message || 'Database error')
		}
	}

	protected async executeProcedure(
		store: string,
		params: any[] = []
	): Promise<ResultSetHeader> {
		try {
			this._logger.info(
				`Executing: ${store}, params: ${JSON.stringify(params)}`
			)
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._db.execute(store, params)
			return response
		} catch (error: any) {
			this._logger.error(error)
			throw new Error(error.message || 'Database error')
		}
	}
}
