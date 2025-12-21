import PaginationService from '@core/libs/pagination/pagination.service'
import { SearchPostCommentDto } from '../dto'
import { RecordsWithCount } from '@core/interfaces'
import { TreeCommentModel } from '@post/imports'

export interface IPostCommentService {
	findPostComments(
		queries: SearchPostCommentDto,
		pagination: PaginationService
	): Promise<TreeCommentModel[]>
}

export interface IPostCommentRepository {
	findTreeItemsAndCount(
		queries: SearchPostCommentDto
	): Promise<RecordsWithCount<TreeCommentModel>>
}
