import { PostBaseModel, PostModel } from '../models/post.model'
import PaginationService from '@core/libs/pagination/pagination.service'
import LoggerService from '@core/libs/logger/logger.system'
import SearchPostDto from '../dtos/search-post.dto'
import { IEventPublisher, RecordsWithCount } from '@core/interfaces'
import { IPostRepository, IPostService } from '../interfaces'
import PostHistoryTrackingEvent from '@post/extensions/history-tracking/events/post-history-tracking.event'
import { BaseService } from '@core/services'

export default class PostService extends BaseService implements IPostService {
	constructor(
		logger: LoggerService,
		private readonly _postRepository: IPostRepository,
		private readonly eventPublisher: IEventPublisher
	) {
		super(logger)
	}

	// public searchPosts = async (
	// 	queries: SearchPostDto,
	// 	userId: number,
	// 	pagination: PaginationService
	// ): Promise<PostBaseModel[]> => {
	// 	try {
	// 		await this.eventPublisher.publish(
	// 			PostHistoryTrackingEvent.create(
	// 				{ ...queries } as SearchPostDto,
	// 				userId
	// 			)
	// 		)

	// 		const result: RecordsWithCount<PostBaseModel> =
	// 			await this._postRepository.findsAndCount(queries)

	// 		const response: PostBaseModel[] = result.records as PostBaseModel[]

	// 		pagination.setTotal(result.total)

	// 		return response
	// 	} catch (error: any) {
	// 		this._loggerService.error(error)
	// 		throw Error(error.message || error)
	// 	}
	// }

	public findPostId = async (itemId: number): Promise<PostModel> => {
		try {
			const response: PostModel = (await this._postRepository.findOne(
				itemId
			)) as PostModel

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
