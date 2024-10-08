import { ResultResponse } from '~/@core/systems/response'
import { MySQlSystem } from '~/systems/dataBase'
import { LoggerSystem } from '~/systems/logger'
import { CategoryModel } from './category-tree.model'

interface ICategoriesRepository {
	findAll(level: number): Promise<CategoryModel[]>
	search(id: number): Promise<CategoryModel[]>
}
export default class CategoriesRepository implements ICategoriesRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem = new MySQlSystem()
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}
	public findAll = async (level: number): Promise<CategoryModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT * FROM HomeCategories WHERE level = ${level}`
			)

			return response as CategoryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public search = async (id: number): Promise<CategoryModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT * FROM HomeCategories WHERE parent_catid = ${id}`
			)

			return response as CategoryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
