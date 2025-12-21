import { generateCartId } from '@helpers/generateId.helper'
import { MESSAGE } from '@core/resources'
import { Builder } from 'builder-pattern'
import { size } from 'lodash'
import { CreateCartDto, UpdateCartDto } from '../dtos'
import { CartModel } from '../models'
import { ICartRepository, ICartService } from '../interfaces'
import LoggerService from '@core/libs/logger/logger.system'
import { SearchCartDto } from '@cart/dtos/search.cart.dto'

export default class CartService implements ICartService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _cartRepository: ICartRepository
	) {}

	public findCarts = async (
		payload: SearchCartDto
	): Promise<{
		err: number
		msg: string
		total: number
		response: any
	}> => {
		try {
			const result: CartModel[] | [] = await this._cartRepository.findAll(
				payload
			)

			let shopIdArrays = result.reduce((acc: any, curr: CartModel) => {
				const shopId = curr.shop_id
				if (acc[shopId]) {
					acc[shopId].push(curr)
				} else {
					acc[shopId] = [curr]
				}
				return acc
			}, {})

			const listNumberCart: any[] = []
			shopIdArrays = Object.values(shopIdArrays)
			shopIdArrays.map((ele: any) =>
				ele.map((item: any, index: number) =>
					listNumberCart.push(index)
				)
			)
			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: size(listNumberCart),
				response: shopIdArrays
			}
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public createCart = async (
		payload: CreateCartDto,
		userId: number
	): Promise<boolean> => {
		try {
			const newCart = Builder<CartModel>()
				.id(generateCartId())
				.user_id(userId)
				.item_id(payload?.item_id)
				.shop_id(payload?.shop_id)
				.variation(
					payload.variation.sort((a, b) =>
						a.name.localeCompare(b.name)
					)
				)
				.amount(payload?.amount)
				.build()

			const isCreated: boolean = await this._cartRepository.create(
				newCart
			)

			if (!isCreated) {
				throw new Error(MESSAGE.CREATE.FAIL)
			}

			return isCreated
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public updateCart = async (
		cartId: number,
		userId: number,
		payload: UpdateCartDto
	): Promise<boolean> => {
		try {
			const isUpdated: boolean = await this._cartRepository.update(
				cartId,
				userId,
				payload
			)

			if (!isUpdated) {
				throw new Error(MESSAGE.UPDATE.FAIL)
			}

			return isUpdated
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public deleteCart = async (
		cartId: number,
		userId: number
	): Promise<boolean> => {
		try {
			const isDeleted: boolean = await this._cartRepository.delete(
				cartId,
				userId
			)

			if (!isDeleted) {
				throw new Error(MESSAGE.DELETE.FAIL)
			}

			return isDeleted
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
