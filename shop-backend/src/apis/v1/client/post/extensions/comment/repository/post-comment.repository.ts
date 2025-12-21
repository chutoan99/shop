import MySQLService from '@core/libs/mysql/mysql.service'
import { IPostCommentRepository } from '../interface'
import { SearchPostCommentDto } from '../dto'
import LoggerService from '@core/libs/logger/logger.system'
import { RecordsWithCount } from '@core/interfaces'
import { TreeCommentModel } from '@post/imports'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class PostCommentRepository
	extends BaseRepository
	implements IPostCommentRepository
{
	private static readonly SP_FIND_COMMENTS = `call sp_get_comments_and_count(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findTreeItemsAndCount = async (
		queries: SearchPostCommentDto
	): Promise<RecordsWithCount<TreeCommentModel>> => {
		const response = await this.callProcedure<any[]>(
			PostCommentRepository.SP_FIND_COMMENTS,
			[JSON.stringify(queries)]
		)

		const total =
			Array.isArray(response) && response[0]?.[0]?.total
				? response[0][0].total
				: 0

		const posts =
			Array.isArray(response) && Array.isArray(response[1])
				? (response[1] as TreeCommentModel[])
				: []

		return {
			total: total,
			records: plainToInstance(
				TreeCommentModel,
				posts as TreeCommentModel[],
				{
					excludeExtraneousValues: true
				}
			)
		}
	}
}
