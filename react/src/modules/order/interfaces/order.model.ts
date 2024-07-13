import { BaseModel } from '../../../@core/interfaces'
import { PostBaseModel } from '../../post/interfaces'
import { UserModel } from '../../user-system/modules/account/interfaces'

export interface OrderModel extends BaseModel {
	id: number
	shop_name: string
	type: number
	state: string
	total_num_items: number
	note: string
	amount: string
	tierVariation: string
	item_option: string
	item_groups_id: string
	final_total: number
	userid: number
	shopid: number
	user: UserModel
	posts: PostBaseModel[]
}

export type TabsModel = {
	is_all: number
	is_returns: number
	is_success: number
	is_cancelled: number
	is_transport: number
	is_delivering: number
	is_wait_for_pay: number
	is_wait_for_confirm: number
}
