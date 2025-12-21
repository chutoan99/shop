import MySQLService from '@core/libs/mysql/mysql.service'
import { IndustryModel } from '../model'
import { PostBaseModel } from '../../post/models'
import SearchIndustryDto from '../dto/search-industry.dto'
import { IIndustryRepository } from '../interface'
import LoggerService from '@core/libs/logger/logger.system'
import { RecordsWithCount } from '@core/interfaces'
import { plainToInstance } from 'class-transformer'
import { BaseRepository } from '@core/repositories'

export default class IndustryRepository
	extends BaseRepository
	implements IIndustryRepository
{
	private static readonly SP_FIND_INDUSTRIES = 'call sp_get_industries()'
	private static readonly SP_SEARCH_INDUSTRY = `call sp_get_industry_posts_and_count(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<IndustryModel[]> => {
		const response = await this.callProcedure<IndustryModel[]>(
			IndustryRepository.SP_FIND_INDUSTRIES
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(IndustryModel, result as IndustryModel[], {
			excludeExtraneousValues: true
		})
	}

	public searchPostAndCount = async (
		queries: SearchIndustryDto
	): Promise<RecordsWithCount<PostBaseModel>> => {
		const response = await this.callProcedure<any[]>(
			IndustryRepository.SP_SEARCH_INDUSTRY,
			[JSON.stringify(queries)]
		)

		const total =
			Array.isArray(response) && response[0]?.[0]?.total
				? response[0][0].total
				: 0

		const posts =
			Array.isArray(response) && Array.isArray(response[1])
				? (response[1] as PostBaseModel[])
				: []

		return {
			total: total,
			records: plainToInstance(PostBaseModel, posts as PostBaseModel[], {
				excludeExtraneousValues: true
			})
		}
	}
}
