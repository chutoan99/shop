import LoggerService from '@core/libs/logger/logger.system'

import { isArray } from 'lodash'
import { FlashSaleModel } from '../models'
import { IFlashSaleRepository, IFlashSaleService } from '../interfaces'
import RedisService from '@core/libs/redis/redis.service'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'

export default class FlashSaleService implements IFlashSaleService {
	static BASE_CACHE_KEY: string = 'flash-sale'

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: FlashSaleService.BASE_CACHE_KEY,
			identifier: option.identifier
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _flashSaleRepository: IFlashSaleRepository
	) {}

	public async findFlashSales(userId: number): Promise<FlashSaleModel[]> {
		try {
			const cacheKey: string = FlashSaleService.generateCacheKey({
				identifier: userId
			})

			this._checkCache(cacheKey)

			const response: FlashSaleModel[] =
				await this._flashSaleRepository.findAll()

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
