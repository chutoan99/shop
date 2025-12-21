import { isArray } from 'lodash'
import {
	IIndustryCategoryTreeRepository,
	IIndustryCategoryTreeService
} from '../interface'
import RedisService from '@core/libs/redis/redis.service'
import LoggerService from '@core/libs/logger/logger.system'
import SearchCategoryTreeDto from '../dto/search-industry-category-tree.dto'
import { IndustryCategoryTreeModel } from '../model'
import { CacheKeyBuilder, CacheKeyOptions } from '@core/libs/redis'
export default class IndustryCategoryTreeService
	implements IIndustryCategoryTreeService
{
	static BASE_CACHE_KEY: string = `category-tree`

	static generateCacheKey(option: CacheKeyOptions) {
		return CacheKeyBuilder.build({
			module: IndustryCategoryTreeService.BASE_CACHE_KEY,
			identifier: option.identifier,
			extra: option.extra
		})
	}

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _IndustryCategoryTreeRepository: IIndustryCategoryTreeRepository
	) {}

	public async findAll(
		queries: SearchCategoryTreeDto,
		userId: number
	): Promise<IndustryCategoryTreeModel[]> {
		try {
			const cacheKey: string =
				IndustryCategoryTreeService.generateCacheKey({
					identifier: userId,
					extra: queries
				})

			this._checkCache(cacheKey)

			const response: IndustryCategoryTreeModel[] =
				await this._IndustryCategoryTreeRepository.findAll(queries)

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
