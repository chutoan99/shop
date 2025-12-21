import { CreatePostLikeDto } from '../dto'
import { PostLikeModel } from '../model'

export interface IPostLikeService {
	findLikes(userId: number): Promise<PostLikeModel[]>
	createLike(payload: CreatePostLikeDto, userid: number): Promise<boolean>
	deleteLike(id: number): Promise<boolean>
	checkExistLike(id: number): Promise<void>
}
export interface IPostLikeRepository {
	findAll(userId: number): Promise<PostLikeModel[]>
	find(id: number): Promise<PostLikeModel>
	create(payload: PostLikeModel): Promise<boolean>
	delete(id: number): Promise<boolean>
}
