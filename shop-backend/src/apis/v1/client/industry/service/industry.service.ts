import RedisService from '@core/libs/redis/redis.service'
import LoggerService from '@core/libs/logger/logger.system'
import PaginationService from '@core/libs/pagination/pagination.service'
import { isArray } from 'lodash'
import { IndustryModel } from '../model'
import { PostBaseModel } from '../../post/models'
import SearchIndustryDto from '../dto/search-industry.dto'
import { IIndustryRepository, IIndustryService } from '../interface'
import { RecordsWithCount } from '@core/interfaces'

export default class IndustryService implements IIndustryService {
	static BASE_CACHE_KEY: string = 'industry'

	constructor(
		private readonly _redisService: RedisService,
		private readonly _loggerService: LoggerService,
		private readonly _industryRepository: IIndustryRepository
	) {}

	public async findIndustries(userId: number): Promise<IndustryModel[]> {
		try {
			const cacheKey: string = `${IndustryService.BASE_CACHE_KEY}-${userId}`

			this._checkCache(cacheKey)

			const response: IndustryModel[] =
				await this._industryRepository.findAll()

			if (isArray(response)) {
				await this._redisService.setCache(cacheKey, response)
			}

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public searchPosts = async (
		queries: SearchIndustryDto,
		pagination: PaginationService
	): Promise<PostBaseModel[]> => {
		try {
			const result: RecordsWithCount<PostBaseModel> =
				await this._industryRepository.searchPostAndCount(queries)

			const response: PostBaseModel[] = result.records

			pagination.setTotal(result.total)

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
