import LoggerService from '@core/libs/logger/logger.system'

import { isArray } from 'lodash'
import { PostTopProductModel } from '../model'
import { IPostTopProductRepository, IPostTopProductService } from '../interface'
import RedisService from '@core/libs/redis/redis.service'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'

export default class PostTopProductService implements IPostTopProductService {
	static BASE_CACHE_KEY: string = 'top-product'

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: PostTopProductService.BASE_CACHE_KEY,
			identifier: option.identifier
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _postTopProductRepository: IPostTopProductRepository
	) {}

	public findAll = async (userId: number): Promise<PostTopProductModel[]> => {
		try {
			const cacheKey: string = PostTopProductService.generateCacheKey({
				identifier: userId
			})

			await this._checkCache(cacheKey)

			const response: PostTopProductModel[] =
				(await this._postTopProductRepository.findAll()) as PostTopProductModel[]

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
