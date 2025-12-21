import { PostModel } from '../../post/models'
import { ShopModel } from '../models'

export interface IShopRepository {
	findItems(id: number): Promise<PostModel[]>
	find(id: number): Promise<ShopModel>
}
export interface IShopService {
	findShopItems(shopId: number, userId: number): Promise<PostModel[]>
	findShop(shopId: number, userId: number): Promise<ShopModel>
}
