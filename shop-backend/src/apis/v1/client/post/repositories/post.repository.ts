import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'
import SearchPostDto from '../dtos/search-post.dto'
import { PostBaseModel, PostModel } from '../models'
import { IPostRepository } from '../interfaces'
import { RecordsWithCount } from '@core/interfaces'
import { BaseRepository } from '@core/repositories'
import { plainToClass, plainToInstance } from 'class-transformer'

export default class PostRepository
	extends BaseRepository
	implements IPostRepository
{
	private static readonly SP_SEARCH_POSTS = `call sp_get_posts_and_count(?)`
	private static readonly SP_GET_POST_DETAIL = `call sp_get_post_detail(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	// public findsAndCount = async (
	// 	queries: SearchPostDto
	// ): Promise<RecordsWithCount<PostBaseModel>> => {
	// 	const response = await this.callProcedure<any[]>(
	// 		PostRepository.SP_SEARCH_POSTS,
	// 		[JSON.stringify(queries)]
	// 	)

	// 	const total =
	// 		Array.isArray(response) && response[0]?.[0]?.total
	// 			? response[0][0].total
	// 			: 0

	// 	const posts =
	// 		Array.isArray(response) && Array.isArray(response[1])
	// 			? (response[1] as PostBaseModel[])
	// 			: []

	// 	return {
	// 		total: total,
	// 		records: plainToInstance(PostBaseModel, posts as PostBaseModel[], {
	// 			excludeExtraneousValues: true
	// 		})
	// 	}
	// }

	public findOne = async (id: number): Promise<PostModel> => {
		const response = await this.callProcedure<PostModel[]>(
			PostRepository.SP_GET_POST_DETAIL,
			[id]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToClass(PostModel, (result as PostModel[])[0], {
			excludeExtraneousValues: true
		})
	}
}
