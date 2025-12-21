import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IPostBaseModel extends IBaseModel {
	id: number
	shop_id: number
	cat_id: number
	name: string
	image: string
	historical_sold: number
	shop_rating: number
	filename: string | null
	shop_name: string
	stock: number
	price_min: number
	price: number
	price_max: number
	price_before_discount: number
	price_min_before_discount: number
	price_max_before_discount: number
	discount: string | null
	is_official_shop: boolean
	is_service_by_shop: boolean
	liked: boolean
	show_free_shipping: boolean
	created_at: Date
	updated_at: Date | null
}

export class PostBaseModel extends BaseModel implements IPostBaseModel {
	@Expose()
	id!: number

	@Expose()
	shop_id!: number

	@Expose()
	cat_id!: number

	@Expose()
	name!: string

	@Expose()
	image!: string

	@Expose()
	historical_sold!: number

	@Expose()
	shop_rating!: number

	@Expose()
	filename!: string | null

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
	discount!: string | null

	@Expose()
	is_official_shop!: boolean

	@Expose()
	is_service_by_shop!: boolean

	@Expose()
	liked!: boolean

	@Expose()
	show_free_shipping!: boolean

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
