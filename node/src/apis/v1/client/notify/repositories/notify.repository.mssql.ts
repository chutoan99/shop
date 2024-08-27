import { IResult } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { NotifyModel } from '../notify.model'
import sql from 'mssql'
import { INotifyRepository } from './notify.interface'

export default class MssqlNotifyRepository implements INotifyRepository {
	private readonly _loggerSystem: LoggerSystem

	constructor() {
		this._loggerSystem = new LoggerSystem()
	}

	public findAll = async (): Promise<NotifyModel[]> => {
		try {
			const response: IResult<NotifyModel[]> =
				await new sql.Request().query(
					`SELECT * FROM [getNotifications]`
				)

			return response.recordset as NotifyModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
