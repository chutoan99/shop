import { Comment } from 'src/types/comment.model'

export interface CommentResponse {
	err: number
	msg: string
	page: number
	limit: number
	totalPage: number
	response: Comment[]
}
