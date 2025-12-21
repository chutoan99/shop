import { SearchCartDto } from '@cart/dtos/search.cart.dto'
import { CreateCartDto, UpdateCartDto } from '../dtos'
import { CartModel } from '../models'

export interface ICartRepository {
	findAll(payload: SearchCartDto): Promise<CartModel[]>
	create(cart: CartModel): Promise<boolean>
	update(id: number, userId: number, cart: UpdateCartDto): Promise<boolean>
	delete(id: number, userId: number): Promise<boolean>
	deleteByPostId(postId: number, userId: number): Promise<boolean>
}
export interface ICartService {
	findCarts(payload: SearchCartDto): Promise<{
		err: number
		msg: string
		total: number
		response: any
	}>
	createCart(payload: CreateCartDto, userId: number): Promise<boolean>
	updateCart(
		cartId: number,
		userId: number,
		payload: UpdateCartDto
	): Promise<boolean>
	deleteCart(cartId: number, userid: number): Promise<boolean>
}
