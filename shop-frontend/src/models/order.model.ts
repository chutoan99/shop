import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose, Type } from 'class-transformer'
import { variationOrder } from '../modules/order/interfaces/order.dto'
import { PostBaseModel } from './post-base.model'
import { UserModel } from './user.model'

export class OrderVariationModel {
	@Expose()
	id!: number

	@Expose()
	name!: string

	@Expose()
	value!: string
}

export class OrderItemModel {
	@Expose()
	@Type(() => PostBaseModel)
	post!: PostBaseModel

	@Expose()
	price!: number

	@Expose()
	amount!: number

	@Expose()
	item_id!: number

	@Expose()
	@Type(() => OrderVariationModel)
	variation!: variationOrder[]
}

export class OrderMetadataModel {
	@Expose()
	note!: string

	@Expose()
	@Type(() => OrderItemModel)
	items!: OrderItemModel[]

	@Expose()
	shop_id!: number

	@Expose()
	shop_name!: string
}

export interface IOrderModel extends IBaseModel {
	id: number
	type: number
	state: string
	final_total: number
	user_id: number
	ship_cost: number
	user: UserModel
	metadata: OrderMetadataModel[]
}

export class OrderModel extends BaseModel implements IOrderModel {
	@Expose()
	id!: number

	@Expose()
	type!: number

	@Expose()
	state!: string

	@Expose()
	final_total!: number

	@Expose()
	user_id!: number

	@Expose()
	ship_cost!: number

	@Expose()
	@Type(() => UserModel) // hoặc => UserModel nếu có class UserModel
	user!: UserModel

	@Expose()
	@Type(() => OrderMetadataModel)
	metadata!: OrderMetadataModel[]

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}

export interface ITabsModel {
	is_all: number
	is_returns: number
	is_success: number
	is_cancelled: number
	is_transport: number
	is_delivering: number
	is_wait_for_pay: number
	is_wait_for_confirm: number
}

export class TabsModel implements ITabsModel {
	@Expose()
	is_all!: number

	@Expose()
	is_returns!: number

	@Expose()
	is_success!: number

	@Expose()
	is_cancelled!: number

	@Expose()
	is_transport!: number

	@Expose()
	is_delivering!: number

	@Expose()
	is_wait_for_pay!: number

	@Expose()
	is_wait_for_confirm!: number
}
