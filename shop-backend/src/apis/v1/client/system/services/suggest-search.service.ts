import LoggerService from '@core/libs/logger/logger.system'

import { isArray } from 'lodash'
import { SuggestSearchModel } from '../models'
import { ISuggestSearchRepository, ISuggestSearchService } from '../interfaces'
import RedisService from '@core/libs/redis/redis.service'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'

export default class SuggestSearchService implements ISuggestSearchService {
	static BASE_CACHE_KEY: string = 'search-suggest'

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: SuggestSearchService.BASE_CACHE_KEY,
			identifier: option.identifier
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _suggestSearchRepository: ISuggestSearchRepository
	) {}

	public async findAll(userId: number): Promise<SuggestSearchModel[]> {
		try {
			const cacheKey: string = SuggestSearchService.generateCacheKey({
				identifier: userId
			})
			this._checkCache(cacheKey)

			const response: SuggestSearchModel[] =
				await this._suggestSearchRepository.findAll()

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
