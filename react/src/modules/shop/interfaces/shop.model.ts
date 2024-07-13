import { BaseModel } from '../../../@core/interfaces'

export interface ShopModel extends BaseModel {
	id: number
	userid: number
	item_count: number
	name: string
	cover: string
	follower_count: number
	rating_star: number
	rating_bad: number
	rating_good: number
	rating_normal: number
	status: number
	shop_location: string
	username: string
	portrait: string
	response_rate: number
	country: string
	response_time: number
	description: string
	followed: number
	last_active_time: string
	is_official_shop: number
}
