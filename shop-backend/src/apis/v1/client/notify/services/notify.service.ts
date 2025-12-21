import NotifyModel from '../schemas/notify.schema'
import { isArray } from 'lodash'
import { INotifyService } from '../interfaces'
import RedisService from '@core/libs/redis/redis.service'
import LoggerService from '@core/libs/logger/logger.system'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'

export default class NotifyService implements INotifyService {
	static BASE_CACHE_KEY: string = 'notify'

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: NotifyService.BASE_CACHE_KEY,
			identifier: option.identifier
		})
	}

	constructor(
		private readonly _redisService: RedisService,
		private readonly _loggerService: LoggerService
	) {}

	findAll = async (userId: number): Promise<(typeof NotifyModel)[]> => {
		try {
			const cacheKey: string = NotifyService.generateCacheKey({
				identifier: userId
			})

			await this._checkCache(cacheKey)

			const response: (typeof NotifyModel)[] | [] =
				await NotifyModel.find()

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
