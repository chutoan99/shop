import { ShopMallModel } from '../model'

export interface IShopMallService {
	findShopMalls(userId: number): Promise<ShopMallModel[]>
}
export interface IShopMallRepository {
	findAll(): Promise<ShopMallModel[]>
}
