import MySQLService from '@core/libs/mysql/mysql.service'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import LoggerService from '@core/libs/logger/logger.system'

import { PostHistoryTrackingModel } from '../model'
import { IPostHistoryTrackingRepository } from '../interface'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class PostHistoryTrackingRepository
	extends BaseRepository
	implements IPostHistoryTrackingRepository
{
	private static readonly SP_GET_HISTORY_TRACKING =
		'call sp_get_histories_tracking(?)'
	private static readonly SP_CREATE_HISTORY_TRACKING = `call sp_create_history_tracking(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (
		userId: number
	): Promise<PostHistoryTrackingModel[]> => {
		const response = await this.callProcedure<PostHistoryTrackingModel[]>(
			PostHistoryTrackingRepository.SP_GET_HISTORY_TRACKING,
			[userId]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(
			PostHistoryTrackingModel,
			result as PostHistoryTrackingModel[],
			{
				excludeExtraneousValues: true
			}
		)
	}

	public create = async (
		payload: PostHistoryTrackingModel
	): Promise<boolean> => {
		const response = await this.executeProcedure(
			PostHistoryTrackingRepository.SP_CREATE_HISTORY_TRACKING,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
