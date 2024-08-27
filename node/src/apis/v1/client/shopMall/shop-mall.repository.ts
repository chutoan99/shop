import { MySQlSystem } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { ShopMallModel } from './shop-mall.model'
interface IShopMallRepository {
	findAll(): Promise<ShopMallModel[]>
}
export default class ShopMallRepository implements IShopMallRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem = new MySQlSystem()
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}
	public findAll = async (): Promise<ShopMallModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT id, url, image, promo_text, createdAt, updatedAt FROM ShopMalls`
			)
			return response as ShopMallModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
