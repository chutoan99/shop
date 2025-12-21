import LoggerService from '@core/libs/logger/logger.system'

import { isArray } from 'lodash'
import { plainToInstance } from 'class-transformer'
import { ShopMallModel } from '../model'
import { IShopMallRepository, IShopMallService } from '../interface'
import RedisService from '@core/libs/redis/redis.service'

export default class ShopMallService implements IShopMallService {
	constructor(
		private readonly _redisService: RedisService,
		private readonly _loggerService: LoggerService,
		private readonly _shopMallRepository: IShopMallRepository
	) {}

	public async findShopMalls(userId: number): Promise<ShopMallModel[]> {
		try {
			const cacheKey: string = `shop-mall-${userId}`

			await this._checkCache(cacheKey)

			const response: ShopMallModel[] =
				(await this._shopMallRepository.findAll()) as ShopMallModel[]

			if (isArray(response)) {
				await this._redisService.setCache(cacheKey, response)
			}

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
