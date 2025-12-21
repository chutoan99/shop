import { IBaseModel } from '@core/interfaces'

export interface CommentModel extends IBaseModel {
	id: number
	parent_cmt_id: number
	user_id: number
	shop_id: number
	item_id: number
	level: number
	is_shop: boolean
	rating: number
	comment: string
	rating_star: number
	status: number
	author_username: string
	author_portrait: string
	images: null | string[]
	cover: null | string
	videos: null | string
	is_replied: boolean
	like_count: number
	liked: boolean
	created_at: Date
	updated_at: Date
	reps: {
		id: number
		cover: null | string
		level: number
		images: null | string[]
		rating: number
		status: number
		videos: null | string
		comment: string
		is_shop: number
		item_id: number
		shop_id: number
		user_id: number
		created_at: Date
		like_count: number
		updated_at: Date
		rating_star: number
		parent_cmt_id: number
		author_portrait: null | string
		author_username: string
	}[]
}
