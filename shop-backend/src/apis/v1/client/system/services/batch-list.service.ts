import LoggerService from '@core/libs/logger/logger.system'

import { isArray } from 'lodash'
import RedisService from '@core/libs/redis/redis.service'
import { IBatchListRepository, IBatchListService } from '../interfaces'
import { BatchListModel } from '../models'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'

export default class BatchListService implements IBatchListService {
	static BASE_CACHE_KEY: string = 'batch-list'

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: BatchListService.BASE_CACHE_KEY,
			identifier: option.identifier
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _batchListRepository: IBatchListRepository
	) {}

	public async findBatchList(userId: number): Promise<BatchListModel[]> {
		try {
			const cacheKey: string = BatchListService.generateCacheKey({
				identifier: userId
			})

			this._checkCache(cacheKey)

			const response: BatchListModel[] =
				await this._batchListRepository.findAll()

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
