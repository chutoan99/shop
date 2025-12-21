import { CreateOrderDto } from '../dtos'
import SearchOrderDto from '../dtos/search-order.dto'
import { OrderModel, TabOrderModel } from '../models'

export interface IOrderRepository {
	search(payload: SearchOrderDto): Promise<OrderModel[]>
	getTab(userId: number): Promise<TabOrderModel>
	find(orderId: number, userId: number): Promise<OrderModel>
	create(order: OrderModel): Promise<boolean>
}
export interface IOrderService {
	searchOrders(queries: SearchOrderDto): Promise<{
		orders: OrderModel[]
		tab: TabOrderModel
	}>
	findOrder(orderid: number, userId: number): Promise<OrderModel>
	createOrder(payload: CreateOrderDto, userId: number): Promise<boolean>
}
