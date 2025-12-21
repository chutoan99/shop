import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IFlashSaleModel extends IBaseModel {
	id: number
	shop_id: number
	cat_id: number | null
	name: string
	image: string
	price: number
	price_before_discount: number
	stock: number
	historical_sold: number | null
	discount: string
	shop_rating?: number
	filename: string | null
	liked: number
	is_official_shop?: number
	is_service_by_shopee?: number
	show_free_shipping: boolean | null
	start_time: string
	end_time: string
	created_at: Date
	updated_at: Date | null
}

export class FlashSaleModel extends BaseModel implements IFlashSaleModel {
	@Expose()
	id!: number

	@Expose()
	shop_id!: number

	@Expose()
	cat_id!: number | null

	@Expose()
	name!: string

	@Expose()
	image!: string

	@Expose()
	price!: number

	@Expose()
	price_before_discount!: number

	@Expose()
	stock!: number

	@Expose()
	historical_sold!: number | null

	@Expose()
	discount!: string

	@Expose()
	shop_rating?: number

	@Expose()
	filename!: string | null

	@Expose()
	liked!: number

	@Expose()
	is_official_shop?: number

	@Expose()
	is_service_by_shopee?: number

	@Expose()
	show_free_shipping!: boolean | null

	@Expose()
	start_time!: string

	@Expose()
	end_time!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
