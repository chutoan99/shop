import { formatDateV2 } from '@helpers/date.helper'
import { Expose, plainToInstance, Transform } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertFlashSaleDto extends InsertBaseDto {
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
	@Transform(({ value }) => (value ? 1 : 0))
	liked!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	is_official_shop!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	is_service_by_shopee!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	show_free_shipping!: boolean

	@Expose()
	start_time!: Date

	@Expose()
	end_time!: Date

	static fromJson(jsonData: any): InsertFlashSaleDto {
		return plainToInstance(InsertFlashSaleDto, {
			id: jsonData.itemid,
			shop_id: jsonData.shopid,
			cat_id: jsonData.catid,
			name: jsonData.name,
			image:
				jsonData.image === ''
					? null
					: `https://cf.shopee.vn/file/${jsonData.image}`,
			stock: jsonData.stock,
			historical_sold: jsonData.historical_sold,
			price: +jsonData.price / 100000,
			price_before_discount: +jsonData.price_before_discount / 100000,
			discount: jsonData.discount,
			shop_rating: jsonData.shop_rating,
			liked: jsonData.liked ? true : false,
			is_official_shop: jsonData.is_official_shop,
			is_service_by_shopee: jsonData.is_service_by_shopee,
			show_free_shipping: jsonData.show_free_shipping,
			start_time: formatDateV2(jsonData.start_time),
			end_time: formatDateV2(jsonData.end_time)
		})
	}
}
