import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'
import { CommentModel } from '../model'
import { IOrderCommentRepository } from '../interface'
import { BaseRepository } from '@core/repositories'

export default class OrderCommentRepository
	extends BaseRepository
	implements IOrderCommentRepository
{
	private static readonly SP_CREATE_COMMENTS = `call sp_create_comment(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public create = async (payload: CommentModel): Promise<boolean> => {
		const response = await this.executeProcedure(
			OrderCommentRepository.SP_CREATE_COMMENTS,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
