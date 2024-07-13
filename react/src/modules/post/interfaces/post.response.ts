import { BaseResponse } from '../../../@core/interfaces'
import { PostBaseModel, ProductDetailModel } from './post.model'

export interface PostResponse extends BaseResponse {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: PostBaseModel[]
}

export interface PostIdResponse extends BaseResponse {
	response: ProductDetailModel
}
