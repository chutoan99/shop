import LoggerService from '@core/libs/logger/logger.system'
import { PostHistoryTrackingModel } from '../model'
import {
	IPostHistoryTrackingRepository,
	IPostHistoryTrackingService
} from '../interface'
import RedisService from '@core/libs/redis/redis.service'
import { CacheKeyBuilder } from '@core/libs/redis'

export default class PostHistoryTrackingService
	implements IPostHistoryTrackingService
{
	static BASE_CACHE_KEY: string = 'post-history-tracking'

	static generateCacheKey(identifier: number) {
		return CacheKeyBuilder.build({
			module: PostHistoryTrackingService.BASE_CACHE_KEY,
			identifier
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _PostHistoryTrackingRepository: IPostHistoryTrackingRepository
	) {}

	public findAll = async (
		userId: number
	): Promise<PostHistoryTrackingModel[]> => {
		try {
			await this._checkCache(
				PostHistoryTrackingService.generateCacheKey(userId)
			)

			const response: PostHistoryTrackingModel[] =
				await this._PostHistoryTrackingRepository.findAll(userId)

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
