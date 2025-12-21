import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'
import { OrderModel, TabOrderModel } from '../models'
import SearchOrderDto from '../dtos/search-order.dto'
import { IOrderRepository } from '../interfaces'
import { BaseRepository } from '@core/repositories'
import { plainToClass, plainToInstance } from 'class-transformer'

export default class OrderRepository
	extends BaseRepository
	implements IOrderRepository
{
	private static readonly SP_SEARCH_ORDERS = 'call sp_get_orders(?, ?)'
	private static readonly SP_GET_TAB_ORDER = `call sp_get_tab_order(?)`
	private static readonly SP_ORDER_DETAIL = `call sp_get_order_detail(?, ?)`
	private static readonly SP_CREATE_ORDER = `call sp_create_order(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public search = async (
		payload: SearchOrderDto
	): Promise<OrderModel[] | []> => {
		const response = await this.callProcedure<OrderModel[]>(
			OrderRepository.SP_SEARCH_ORDERS,
			[payload.userId, JSON.stringify(payload)]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(OrderModel, result as OrderModel[], {
			excludeExtraneousValues: true
		})
	}

	public getTab = async (userId: number): Promise<TabOrderModel> => {
		const response = await this.callProcedure<any[]>(
			OrderRepository.SP_GET_TAB_ORDER,
			[userId]
		)

		const tab =
			Array.isArray(response) && response[0]?.[0]?.tab
				? response[0][0].tab
				: 0

		return plainToClass(TabOrderModel, tab as TabOrderModel, {
			excludeExtraneousValues: true
		})
	}

	public find = async (
		orderId: number,
		userId: number
	): Promise<OrderModel> => {
		const response = await this.callProcedure<OrderModel[]>(
			OrderRepository.SP_ORDER_DETAIL,
			[orderId, userId]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToClass(OrderModel, (result as OrderModel[])[0], {
			excludeExtraneousValues: true
		})
	}

	public create = async (payload: OrderModel): Promise<boolean> => {
		const response = await this.executeProcedure(
			OrderRepository.SP_CREATE_ORDER,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
