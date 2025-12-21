import { BaseModel } from '@core/interfaces'
import { Expose, Transform } from 'class-transformer'

export class ShopBase extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	name!: string

	@Expose()
	username!: string

	@Expose()
	portrait?: string | null

	@Expose()
	last_active_time!: string

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_official_shop!: boolean
}

export class ShopModel extends ShopBase {
	@Expose()
	user_id!: number

	@Expose()
	item_count!: number

	@Expose()
	rating_star!: number

	@Expose()
	cover?: string | null

	@Expose()
	follower_count!: number

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
	response_rate!: number

	@Expose()
	country!: string

	@Expose()
	response_time!: number

	@Expose()
	description!: string

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	followed!: boolean
}
