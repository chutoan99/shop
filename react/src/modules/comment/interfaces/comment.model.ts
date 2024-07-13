import { BaseModel } from '../../../@core/interfaces'

export interface CommentModel extends BaseModel {
	cmtid: number
	orderid: number
	parent_cmtid: null | number
	itemid: number
	userid: number
	shopid: number
	level: boolean
	is_shop: boolean
	rating: number
	status: number
	rating_star: number
	like_count: number
	comment: string
	author_username: string
	author_portrait: string
	images: string[]
	cover: string
	videos: string
	model_name: string
	options: string
	liked: boolean
	is_replied: boolean
	ctime: number
	mtime: number
	comment_rep: null | {
		cmtid: number
		orderid: number
		parent_cmtid: number
		itemid: number
		userid: number
		shopid: number
		level: boolean
		is_shop: boolean
		comment: string
		createdAt: Date
		updatedAt: Date
		ctime: number
		mtime: number
	}
}
