import { MySQlSystem } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { SearchSuggestModel } from './search-suggest.model'
interface ISearchSuggestRepository {
	findAll(): Promise<SearchSuggestModel[]>
}
export default class SearchSuggestRepository
	implements ISearchSuggestRepository
{
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}
	public findAll = async (): Promise<SearchSuggestModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT id, text, count, createdAt, updatedAt  FROM SearchSuggestions`
			)

			return response as SearchSuggestModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
