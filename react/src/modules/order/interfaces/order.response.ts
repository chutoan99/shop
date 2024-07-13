import { BaseResponse } from '../../../@core/interfaces'
import { OrderModel, TabsModel } from './order.model'

export interface OrdersResponse extends BaseResponse {
	response: OrderModel[]
	tab: TabsModel
}

export interface OrderResponse extends BaseResponse {
	response: OrderModel
}

export interface CreateOrdersResponse extends BaseResponse {}
