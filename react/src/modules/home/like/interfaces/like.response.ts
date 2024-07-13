import { PostBaseModel } from '../../../post/interfaces'

export interface LikeResponse {
	userid: number
	itemid: number
	shopid: number
	likeDetail: PostBaseModel
}
