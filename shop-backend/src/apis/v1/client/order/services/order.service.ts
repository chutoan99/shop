import { MESSAGE } from '@core/resources'
import { generateOrderId } from '@helpers/generateId.helper'
import { stateOrder, titleStateOrder } from '../resources/order.enum'
import { Builder } from 'builder-pattern'
import LoggerService from '@core/libs/logger/logger.system'
import SearchOrderDto from '../dtos/search-order.dto'
import { OrderModel, TabOrderModel } from '../models'
import { CreateOrderDto } from '../dtos'
import { IEventPublisher } from '@core/interfaces'
import { IOrderRepository, IOrderService } from '../interfaces'
import CartEvent from '../../cart/events/cart.event'

export default class OrderService implements IOrderService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _orderRepository: IOrderRepository,
		private readonly _eventPublisher: IEventPublisher
	) {}

	public searchOrders = async (
		queries: SearchOrderDto
	): Promise<{
		orders: OrderModel[]
		tab: TabOrderModel
	}> => {
		try {
			const tab: TabOrderModel = await this._orderRepository.getTab(
				queries.userId
			)
			const response: OrderModel[] = await this._orderRepository.search(
				queries
			)

			return { tab: tab, orders: response }
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public findOrder = async (
		orderid: number,
		userid: number
	): Promise<OrderModel> => {
		try {
			const response: OrderModel = await this._orderRepository.find(
				orderid,
				userid
			)
			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public createOrder = async (
		payload: CreateOrderDto,
		userid: number
	): Promise<boolean> => {
		try {
			const newOrder = Builder<OrderModel>()
				.id(generateOrderId())
				.user_id(userid)
				.state(titleStateOrder.is_wait_for_confirm)
				.type(stateOrder.is_wait_for_confirm)
				.shiped(false)
				.final_total(payload.final_total)
				.ship_cost(payload.ship_cost)
				.metadata(payload.metadata)
				.user(payload.user)
				.build()

			const isCreated = await this._orderRepository.create(newOrder)

			if (!isCreated) {
				throw new Error(MESSAGE.CREATE.FAIL)
			}

			this._eventPublisher.publish(
				CartEvent.create(newOrder.metadata, userid)
			)

			return isCreated
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
