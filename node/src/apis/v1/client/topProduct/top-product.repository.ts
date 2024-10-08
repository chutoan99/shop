import { MySQlSystem } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { TopProductModel } from './top-product.model'
interface ITopProductRepository {
	findAll(): Promise<TopProductModel[]>
}
export default class TopProductRepository implements ITopProductRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}

	public findAll = async (): Promise<TopProductModel[]> => {
		try {
			const [response]: ResultResponse =
				await this._MySQlSystem.db.query(
					`SELECT id, data_type, count, name, images, sort_type, best_price, display_text, createdAt, updatedAt FROM TopProducts`
				)
			return response as TopProductModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
