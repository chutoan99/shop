import LoggerService from '@core/libs/logger/logger.system'
import { isArray } from 'lodash'
import { BannerModel } from '../models'
import { IBannerRepository, IBannerService } from '../interfaces'
import RedisService from '@core/libs/redis/redis.service'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'

export default class BannerService implements IBannerService {
	static BASE_CACHE_KEY: string = 'banner'

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: BannerService.BASE_CACHE_KEY,
			identifier: option.identifier
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _bannerRepository: IBannerRepository
	) {}

	public async findBanners(userId: number): Promise<BannerModel[]> {
		try {
			const cacheKey: string = BannerService.generateCacheKey({
				identifier: userId
			})
			this._checkCache(cacheKey)

			const response: BannerModel[] =
				await this._bannerRepository.findAll()

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
