import { MySQlSystem } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import {SearchHistoryModel} from './search-history.model'
import { LoggerSystem } from '~/systems/logger'
interface ISearchHistoryRepository {
	findAll(userId: number): Promise<SearchHistoryModel[]>
	create(search: SearchHistoryModel): Promise<boolean>
}

export default class SearchHistoryRepository
	implements ISearchHistoryRepository
{
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}
	public findAll = async (userId: number): Promise<SearchHistoryModel[]> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT id, userid, text, createdAt, updatedAt  FROM SearchHistories WHERE userid = ${userId} ORDER BY createdAt DESC LIMIT 10`
			)

			return response as SearchHistoryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public create = async (search: SearchHistoryModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._MySQlSystem.db.execute(
					`INSERT INTO SearchHistories (userid, text) VALUES (?, ?)`,
					[search.userid, search.text]
				)
			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
