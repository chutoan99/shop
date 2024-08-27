import { MySQlSystem } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { NotifyModel } from '../notify.model'
import { INotifyRepository } from './notify.interface'

export default class MysqlNotifyRepository implements INotifyRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}

	public findAll = async (): Promise<NotifyModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT id, image, title, content, userid, seen , time, createdAt, updatedAt  FROM Notifications`
			)

			return response as NotifyModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
