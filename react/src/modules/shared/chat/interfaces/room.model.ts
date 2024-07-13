import { BaseModel } from '../../../../@core/interfaces'
import { ShopModel } from '../../../shop/interfaces'

export interface RoomModel extends BaseModel {
	id: number
	userid: number
	shopid: number
	shop_info: ShopModel
}
