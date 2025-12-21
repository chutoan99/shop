import { CreateCommentDto } from '../dto'
import { CommentModel } from '../model'

export interface IOrderCommentService {
	createComment(userid: number, payload: CreateCommentDto): Promise<boolean>
}

export interface IOrderCommentRepository {
	create(comment: CommentModel): Promise<boolean>
}
