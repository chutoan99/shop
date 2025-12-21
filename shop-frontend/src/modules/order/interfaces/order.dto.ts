import { PostBaseModel } from '@models/post-base.model'
import { IUserModel } from '@models/user.model'

export type variationOrder = {
	name: string | ''
	option: string | ''
}

export type QueryOrderDto = {
	type: number | null
	shop_name: string
}

export interface metadataOrderDto {
	shop_id: number
	shop_name: string
	note: string
	items: [post: PostBaseModel, item_id: number, price: number, amount: number, variation: [variationOrder] | []]
}

export type CreateOrderDto = {
	final_total: number
	ship_cost: number
	total_num_items: number
	user: Partial<IUserModel>
	metadata: metadataOrderDto[]
}
