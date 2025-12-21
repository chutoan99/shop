import PaginationService from '@core/libs/pagination/pagination.service'
import { SearchPostCommentDto } from '../dto'
import { IPostCommentRepository, IPostCommentService } from '../interface'
import LoggerService from '@core/libs/logger/logger.system'
import { RecordsWithCount } from '@core/interfaces'
import { TreeCommentModel } from '@post/imports'
export default class PostCommentService implements IPostCommentService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _PostCommentRepository: IPostCommentRepository
	) {}

	public findPostComments = async (
		queries: SearchPostCommentDto,
		pagination: PaginationService
	): Promise<TreeCommentModel[]> => {
		try {
			const result: RecordsWithCount<TreeCommentModel> =
				await this._PostCommentRepository.findTreeItemsAndCount(queries)

			const response: TreeCommentModel[] =
				result.records as TreeCommentModel[]

			pagination.setTotal(result.total)

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
