import SearchPostDto from '../dtos/search-post.dto'
import { PostBaseModel, PostModel } from '../models'
import { RecordsWithCount } from '@core/interfaces/records-with-count.interface'
import { IBaseService } from '@core/services'

export interface IPostService extends IBaseService {
	findPostId(itemid: number): Promise<PostModel>
}
export interface IPostRepository {
	findOne(id: number): Promise<PostModel>
	// findsAndCount(
	// 	queries: SearchPostDto
	// ): Promise<RecordsWithCount<PostBaseModel>>
}
