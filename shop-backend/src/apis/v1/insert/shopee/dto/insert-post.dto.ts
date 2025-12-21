import { InsertBaseDto } from '../base-insert.dto'
import { formatDateV2 } from '@helpers/date.helper'
import { Expose, plainToInstance, Transform } from 'class-transformer'

export class InsertVariation {
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

export class InsertPostDto extends InsertBaseDto {
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
	@Transform(({ value }) => (value ? 1 : 0))
	is_official_shop!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	is_service_by_shop!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	liked!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	show_free_shipping!: number

	@Expose()
	discount_id!: number

	@Expose()
	promotion_id!: number

	@Expose()
	currency!: string

	@Expose()
	video_id?: string

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
	variations!: InsertVariation[]

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

	static fromJson(jsonData: any): InsertPostDto {
		return plainToInstance(InsertPostDto, {
			id: jsonData?.itemid,
			shop_id: jsonData?.shopid,
			currency: jsonData?.currency,
			stock: jsonData?.stock,
			status: jsonData?.status,
			sold: jsonData?.sold,
			liked_count: jsonData?.liked_count,
			promotion_id: jsonData?.voucher_info?.promotion_id || null,
			video_id: jsonData?.video_info_list[0]?.video_id || null,
			discount_id: jsonData?.itemid,
			cat_id: jsonData?.catid,
			cmt_count: jsonData?.cmt_count,
			discount: jsonData?.discount,
			description: jsonData?.description,
			raw_discount: jsonData?.raw_discount,
			size_chart:
				jsonData?.size_chart === null
					? null
					: `https://cf.shopee.vn/file/${jsonData?.size_chart}`,
			shop_name: jsonData?.shop_name,
			transparent_background_image:
				jsonData?.transparent_background_image === ''
					? null
					: `https://cf.shopee.vn/file/${jsonData?.transparent_background_image}`,
			images: (
				jsonData?.images.map((item: any) => {
					return `https://cf.shopee.vn/file/${item}`
				}) as any
			).join(','),
			view_count: jsonData?.view_count ? jsonData?.view_count : 0,
			name: jsonData?.name,
			image:
				jsonData?.image === ''
					? null
					: `https://cf.shopee.vn/file/${jsonData?.image}`,
			historical_sold: jsonData?.historical_sold,
			price: +jsonData?.price / 100000,
			price_min: +jsonData?.price_min / 100000,
			price_max: +jsonData?.price_max / 100000,
			price_before_discount: +jsonData?.price_before_discount / 100000,
			price_min_before_discount:
				+jsonData?.price_min_before_discount / 100000,
			price_max_before_discount:
				+jsonData?.price_max_before_discount / 100000,
			shop_rating: jsonData?.shop_rating,
			liked: jsonData?.liked ? 1 : 0,
			is_official_shop: jsonData?.is_official_shop ? 1 : 0,
			is_service_by_shop: jsonData?.is_service_by_shopee ? 1 : 0,
			show_free_shipping: jsonData?.show_free_shipping ? 1 : 0,
			variations:
				jsonData?.tier_variations &&
				jsonData?.tier_variations?.length > 0 &&
				jsonData?.tier_variations[0].name !== ''
					? (jsonData?.tier_variations as []).map((item: any) => {
							const images: string[] = []
							if (item?.images?.length > 0) {
								item?.images.forEach((img: string) => {
									if (!img) return
									images.push(
										`https://cf.shopee.vn/file/${img}`
									)
								})
							}
							return {
								name: item.name,
								options: item.options,
								type: item.type,
								properties: item.properties,
								images: images
							}
					  })
					: [],
			created_at: formatDateV2(jsonData?.ctime),
			updated_at: formatDateV2(jsonData?.ctime)
		})
	}
}
