import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IShopModel extends IBaseModel {
	id: number
	user_id: number
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
	created_at: Date
	updated_at: Date | null
}

export class ShopModel extends BaseModel implements IShopModel {
	@Expose()
	id!: number

	@Expose()
	user_id!: number

	@Expose()
	item_count!: number

	@Expose()
	name!: string

	@Expose()
	cover!: string

	@Expose()
	follower_count!: number

	@Expose()
	rating_star!: number

	@Expose()
	rating_bad!: number

	@Expose()
	rating_good!: number

	@Expose()
	rating_normal!: number

	@Expose()
	status!: number

	@Expose()
	shop_location!: string

	@Expose()
	username!: string

	@Expose()
	portrait!: string

	@Expose()
	response_rate!: number

	@Expose()
	country!: string

	@Expose()
	response_time!: number

	@Expose()
	description!: string

	@Expose()
	followed!: number

	@Expose()
	last_active_time!: string

	@Expose()
	is_official_shop!: number

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
export class ShopBaseModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	name!: string

	@Expose()
	username!: string

	@Expose()
	portrait!: string

	@Expose()
	last_active_time!: string

	@Expose()
	is_official_shop!: number
}
