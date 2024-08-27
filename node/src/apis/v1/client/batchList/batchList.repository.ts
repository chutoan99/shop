import { ResultResponse } from '~/@core/systems/response'
import { MySQlSystem } from '~/systems/dataBase'
import { LoggerSystem } from '~/systems/logger'
import { BatchListModel } from './batchList.model'
interface IBatchListRepository {
	findAll(): Promise<BatchListModel[]>
}

export default class BatchListRepository implements IBatchListRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}
	public findAll = async (): Promise<BatchListModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT id, banner_image, title, end, start, createdAt, updatedAt FROM BatchLists`
			)
			return response as BatchListModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
