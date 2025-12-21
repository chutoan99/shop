import { Response } from 'express'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { CreateOrderDto } from '../dtos'
import {
	AuthenticatedRequest,
	BaseErrors,
	CommandResponse,
	MESSAGE,
	STATUS_CODE
} from '@core/index'
import { OrderModel, TabOrderModel } from '../models'
import SearchOrderDto from '../dtos/search-order.dto'
import { IOrderService } from '../interfaces'
export default class OrderController {
	constructor(private readonly _orderService: IOrderService) {}

	public search = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const queries: SearchOrderDto = plainToInstance(
				SearchOrderDto,
				req.query
			)
			queries.userId = +req.user.id!

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response: {
				orders: OrderModel[]
				tab: TabOrderModel
			} = await this._orderService.searchOrders(queries)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json({
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: response.orders,
				tab: response.tab
			})
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}

	public getOne = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const response = await this._orderService.findOrder(
				+req.params.orderId,
				+req.user.id!
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json({
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: response
			})
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}

	public create = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const payload = plainToClass(CreateOrderDto, req.body)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._orderService.createOrder(payload, +req.user.id!)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				})
			)
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}
}
