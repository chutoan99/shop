import { BaseResponse } from '../../../@core/interfaces'
import { CommentModel } from './comment.model'

export interface CommentsResponse extends BaseResponse {
	page: number
	limit: number
	totalPage: number
	totalItem: number
	response: CommentModel[]
}
