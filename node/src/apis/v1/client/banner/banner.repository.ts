import { ResultResponse } from '~/@core/systems/response'
import { MySQlSystem } from '~/systems/dataBase'
import { LoggerSystem } from '~/systems/logger'
import { BannerModel } from './banner.model'

interface IBannerRepository {
	findAll(): Promise<BannerModel[]>
}

export default class BannerRepository implements IBannerRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}

	public findAll = async (): Promise<BannerModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT id, image_url , createdAt , updatedAt  FROM Banners`
			)

			return response as BannerModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
