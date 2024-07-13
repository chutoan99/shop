import { BaseResponse } from '../../../@core/interfaces'
import { CartModel } from './cart.model'

export interface CartResponse extends BaseResponse {
	total: number
	response: [CartModel[]]
}

export interface CreateCartResponse extends BaseResponse {}

export interface UpdateCartResponse extends BaseResponse {}

export interface DeleteCartResponse extends BaseResponse {}
