import LoggerService from '@core/libs/logger/logger.system'

import { PostModel } from '../../post/models'
import { ShopModel } from '../models'
import { IShopRepository, IShopService } from '../interfaces'
import RedisService from '@core/libs/redis/redis.service'

export default class ShopService implements IShopService {
	constructor(
		private readonly _redisService: RedisService,
		private readonly _loggerService: LoggerService,
		private readonly _shopRepository: IShopRepository
	) {}

	public findShopItems = async (
		shopId: number,
		userId: number
	): Promise<PostModel[]> => {
		try {
			const cacheKey: string = `shop-product-${shopId}-${userId}`

			await this._checkCache(cacheKey)

			const response: PostModel[] = await this._shopRepository.findItems(
				shopId
			)

			await this._redisService.setCache(cacheKey, response)

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public findShop = async (
		shopId: number,
		userId: number
	): Promise<ShopModel> => {
		try {
			const cacheKey: string = `shopInfo-${shopId}-${userId}`

			await this._checkCache(cacheKey)

			const response: ShopModel = await this._shopRepository.find(shopId)

			await this._redisService.setCache(cacheKey, response)

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	private async _checkCache(cacheKey: string) {
		return await this._redisService.getCache(cacheKey)
	}
}
