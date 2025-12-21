import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	CommandResponse,
	MESSAGE,
	STATUS_CODE
} from '@core/index'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { CreateCartDto, UpdateCartDto } from '../dtos'
import { ICartService } from '../interfaces'
import { SearchCartDto } from '@cart/dtos/search.cart.dto'
export default class CartController {
	constructor(private readonly _cartService: ICartService) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: SearchCartDto = plainToInstance(
				SearchCartDto,
				req.query
			)
			payload.userId = +req.user.id!

			const response = await this._cartService.findCarts(payload)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public create = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: CreateCartDto = plainToInstance(
				CreateCartDto,
				req.body
			)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)
			await this._cartService.createCart(payload, +req.user.id!)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public update = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: UpdateCartDto = plainToInstance(
				UpdateCartDto,
				req.body
			)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._cartService.updateCart(
				+req.params.cartId,
				+req.user.id!,
				payload
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public delete = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			await this._cartService.deleteCart(
				+req.params.cartId,
				+req.user.id!
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 1,
					msg: MESSAGE.DELETE.FAIL
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
