import { formatDateV2 } from '@helpers/date.helper'
import { Expose, plainToInstance, Transform } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertShopDto extends InsertBaseDto {
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
	@Transform(({ value }) => (value ? 1 : 0))
	is_official_shop!: number // Chuyển boolean thành số (1 hoặc 0)

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
	@Transform(({ value }) => (value ? 1 : 0))
	followed!: number

	static fromJson(jsonData: any): InsertShopDto {
		return plainToInstance(InsertShopDto, {
			id: jsonData?.data?.shopid,
			user_id: jsonData?.data?.userid,
			portrait: jsonData?.data?.account?.portrait
				? `https://cf.shopee.vn/file/${jsonData?.data?.account?.portrait}`
				: null,
			username: jsonData?.data?.account?.username,
			is_official_shop: jsonData?.data?.is_official_shop ? 1 : 0, // Chuyển đổi boolean
			shop_location: jsonData?.data?.shop_location,
			item_count: jsonData?.data?.item_count,
			name: jsonData?.data?.name,
			cover: jsonData?.data?.cover
				? `https://cf.shopee.vn/file/${jsonData?.data?.cover}`
				: null,
			rating_star: jsonData?.data?.rating_star,
			rating_bad: jsonData?.data?.rating_bad,
			rating_good: jsonData?.data?.rating_good,
			rating_normal: jsonData?.data?.rating_normal,
			follower_count: jsonData?.data?.follower_count,
			status: jsonData?.data?.status,
			response_time: jsonData?.data?.response_time,
			description: jsonData?.data?.description,
			followed: 0, // Mặc định là 0
			response_rate: jsonData?.data?.response_rate,
			country: jsonData?.data?.country,
			last_active_time: formatDateV2(jsonData?.data?.last_active_time),
			created_at: formatDateV2(jsonData?.data?.ctime),
			updated_at: formatDateV2(jsonData?.data?.ctime)
		})
	}
}
