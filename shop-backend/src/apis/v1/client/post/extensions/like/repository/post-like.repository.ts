import MySQLService, { ResultResponse } from '@core/libs/mysql/mysql.service'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import LoggerService from '@core/libs/logger/logger.system'

import { PostLikeModel } from '../model'
import { IPostLikeRepository } from '../interface'
import { plainToInstance } from 'class-transformer'

export default class PostLikeRepository implements IPostLikeRepository {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _mySQLService: MySQLService
	) {}

	public findAll = async (userId: number): Promise<PostLikeModel[]> => {
		try {
			const sql = `SELECT id, user_id, item_id, shop_id, metadata, created_at, updated_at FROM likes WHERE user_id = ${userId}`

			const [response]: ResultResponse = await this._mySQLService.query(
				sql
			)

			this._loggerService.info(sql)

			return plainToInstance(PostLikeModel, response as PostLikeModel[], {
				excludeExtraneousValues: true
			})
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public find = async (id: number): Promise<PostLikeModel> => {
		try {
			const sql = `SELECT * from likes WHERE id = ${id}`

			const [response]: ResultResponse = await this._mySQLService.query(
				sql
			)

			this._loggerService.info(sql)

			return (response as PostLikeModel[])[0]
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public create = async (like: PostLikeModel): Promise<boolean> => {
		try {
			const sql = `INSERT INTO likes (id, user_id, item_id, shop_id) VALUES (?, ?, ?, ?)`

			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._mySQLService.execute(sql, [
					like.id,
					like.user_id,
					like.item_id,
					like.shop_id
				])

			this._loggerService.info(sql)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public delete = async (id: number): Promise<boolean> => {
		try {
			const sql = `DELETE FROM likes WHERE id = ${id}`

			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._mySQLService.execute(sql)

			this._loggerService.info(sql)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
