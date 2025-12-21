import { BaseModel } from '@core/interfaces'
import { Expose, Transform } from 'class-transformer'

export class Variation {
	@Expose()
	name!: string

	@Expose()
	type!: number

	@Expose()
	images!: string[]

	@Expose()
	options!: string[]

	@Expose()
	properties!: any[]
}

export class PostBaseModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	shop_id!: number

	@Expose()
	cat_id!: number

	@Expose()
	name!: string

	@Expose()
	image!: string | null

	@Expose()
	historical_sold!: number

	@Expose()
	shop_rating!: number

	@Expose()
	filename!: any

	@Expose()
	shop_name!: string

	@Expose()
	stock!: number

	@Expose()
	price_min!: number

	@Expose()
	price!: number

	@Expose()
	price_max!: number

	@Expose()
	price_before_discount!: number

	@Expose()
	price_min_before_discount!: number

	@Expose()
	price_max_before_discount!: number

	@Expose()
	discount!: string

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_official_shop!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_service_by_shop!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	liked!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	show_free_shipping!: number
}
export class PostModel extends PostBaseModel {
	@Expose()
	discount_id!: number

	@Expose()
	promotion_id!: number

	@Expose()
	currency!: string

	@Expose()
	videoid?: string

	@Expose()
	transparent_background_image!: string | null

	@Expose()
	size_chart?: string | null

	@Expose()
	status!: number

	@Expose()
	sold!: number

	@Expose()
	liked_count!: number

	@Expose()
	cmt_count!: number

	@Expose()
	raw_discount!: number

	@Expose()
	description!: any

	@Expose()
	view_count!: number

	@Expose()
	variations!: Variation[]

	@Expose()
	@Transform(({ value }) =>
		typeof value === 'string' ? value.split(',') : value
	)
	images!: string[]

	@Expose()
	shop_info!: object

	@Expose()
	voucher!: object

	@Expose()
	deep_discount_skin!: object

	@Expose()
	video!: object

	@Expose()
	category!: object
}
