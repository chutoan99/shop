import MySQLService from '@core/libs/mysql/mysql.service'
import { CartModel } from '../models'
import { ICartRepository } from '../interfaces'
import LoggerService from '@core/libs/logger/logger.system'
import { UpdateCartDto } from '../dtos'
import { SearchCartDto } from '@cart/dtos/search.cart.dto'
import { plainToInstance } from 'class-transformer'
import { BaseRepository } from '@core/repositories'

export default class CartRepository
	extends BaseRepository
	implements ICartRepository
{
	private static readonly SP_FIND_CARTS = 'call sp_get_carts(?)'
	private static readonly SP_CREATE_CARTS = `call sp_create_cart(?)`
	private static readonly SP_UPDATE_CARTS = `call sp_update_cart(?, ?, ?)`
	private static readonly SP_DELETE_CARTS = `call sp_delete_cart_by_id(?, ?)`
	private static readonly SP_DELETE_CARTS_BY_POSTS_ID = `call sp_delete_cart_by_postId(?, ?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (payload: SearchCartDto): Promise<CartModel[]> => {
		const response = await this.callProcedure<CartModel[]>(
			CartRepository.SP_FIND_CARTS,
			[payload.userId]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(CartModel, result as CartModel[], {
			excludeExtraneousValues: true
		})
	}

	public create = async (payload: CartModel): Promise<boolean> => {
		const response = await this.executeProcedure(
			CartRepository.SP_CREATE_CARTS,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public update = async (
		id: number,
		userId: number,
		cart: UpdateCartDto
	): Promise<boolean> => {
		const response = await this.executeProcedure(
			CartRepository.SP_UPDATE_CARTS,
			[JSON.stringify(cart), id, userId]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public delete = async (
		cartId: number,
		userId: number
	): Promise<boolean> => {
		const response = await this.executeProcedure(
			CartRepository.SP_DELETE_CARTS,
			[cartId, userId]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public deleteByPostId = async (
		postId: number,
		userId: number
	): Promise<boolean> => {
		const response = await this.executeProcedure(
			CartRepository.SP_DELETE_CARTS_BY_POSTS_ID,
			[postId, userId]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
