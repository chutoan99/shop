import { BaseResponse } from '../../../@core/interfaces'
import { PostBaseModel } from '../../post/interfaces'
import { ShopModel } from './shop.model'

export interface ItemsShopResponse extends BaseResponse {
	total: number
	response: PostBaseModel[]
}

export interface ShopIdResponse extends BaseResponse {
	response: ShopModel
}
