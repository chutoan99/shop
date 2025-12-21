import { Expose, plainToInstance, Transform } from 'class-transformer'
import { formatDateV2 } from '@helpers/date.helper'
import { InsertBaseDto } from '../base-insert.dto'

export enum typeComment {
	comment,
	reply
}

export class InsertCommentDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	parent_cmt_id!: number | null

	@Expose()
	user_id!: number

	@Expose()
	shop_id!: number

	@Expose()
	order_id!: number

	@Expose()
	item_id!: number

	@Expose()
	level!: number

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	is_shop!: boolean

	@Expose()
	rating: number | null | undefined

	@Expose()
	comment!: string

	@Expose()
	rating_star!: number

	@Expose()
	status!: number

	@Expose()
	author_username!: string

	@Expose()
	author_portrait?: string | null

	@Expose()
	images: string | null | undefined

	@Expose()
	cover?: string | null | undefined

	@Expose()
	videos?: string | null | undefined

	@Expose()
	tier_variation?: string | null | undefined

	@Expose()
	list_option?: string | null | undefined

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	is_replied!: boolean

	@Expose()
	like_count: number | null | undefined

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	liked: boolean | null | undefined

	static fromJson(jsonData: any, type: typeComment): InsertCommentDto {
		switch (type) {
			case typeComment.comment:
				return plainToInstance(InsertCommentDto, {
					id: jsonData.cmtid,
					order_id: jsonData?.orderid,
					item_id: jsonData?.itemid,
					rating: jsonData?.rating,
					user_id: jsonData?.userid,
					shop_id: jsonData?.shopid,
					parent_cmt_id: 0,
					comment: jsonData?.comment,
					rating_star: jsonData?.rating_star,
					status: jsonData?.status,
					author_username: jsonData?.author_username,
					author_portrait:
						jsonData?.author_portrait === ''
							? null
							: `https://cf.shopee.vn/file/${jsonData?.author_portrait}`,
					images:
						jsonData?.images?.length > 0
							? (
									jsonData?.images?.map((item: any) => {
										return `https://cf.shopee.vn/file/${item}`
									}) as any
							  )?.join(',')
							: null,
					cover:
						jsonData?.videos?.length >= 0
							? jsonData?.videos[0]?.cover
							: null,
					videos:
						jsonData?.videos?.length >= 0
							? jsonData?.videos[0]?.url
							: null,
					tier_variation: jsonData?.product_items[0].model_name,
					list_option:
						jsonData?.product_items[0]?.options?.length > 0
							? jsonData?.product_items[0]?.options[0]
							: null,
					is_replied:
						jsonData.ItemRatingReply === null ? false : true,
					level: 0,
					is_shop: jsonData.ItemRatingReply === null ? false : true,
					like_count: jsonData?.like_count ? jsonData?.like_count : 0,
					liked: false,
					created_at: formatDateV2(jsonData?.mtime),
					updated_at: formatDateV2(jsonData?.mtime)
				})
			case typeComment.reply:
				return plainToInstance(InsertCommentDto, {
					id: jsonData.cmtid + jsonData?.userid,
					order_id: jsonData?.orderid,
					item_id: jsonData?.itemid,
					rating: 0,
					user_id: jsonData?.userid,
					shop_id: jsonData?.shopid,
					parent_cmt_id: jsonData.cmtid,
					comment: jsonData.ItemRatingReply?.comment,
					rating_star: jsonData?.rating_star,
					status: jsonData?.status,
					author_username: jsonData?.author_username,
					author_portrait: null,
					images: null,
					cover: null,
					videos: null,
					tier_variation: null,
					list_option: null,
					is_replied: true,
					level: 1,
					is_shop: true,
					like_count: 0,
					liked: null,
					created_at: formatDateV2(jsonData?.mtime),
					updated_at: formatDateV2(jsonData?.mtime)
				})
		}
	}
}
