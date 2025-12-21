import { BaseModel } from '@core/interfaces'
import { Expose, Transform } from 'class-transformer'

export class FlashSaleModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	shop_id!: number

	@Expose()
	cat_id!: number

	@Expose()
	name!: string

	@Expose()
	image?: string | null

	@Expose()
	price!: number

	@Expose()
	price_before_discount!: number

	@Expose()
	stock!: number

	@Expose()
	historical_sold!: number

	@Expose()
	discount!: string

	@Expose()
	shop_rating!: number

	@Expose()
	filename!: string

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	liked!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_official_shop!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_service_by_shopee!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	show_free_shipping!: boolean

	@Expose()
	start_time!: Date

	@Expose()
	end_time!: Date
}
