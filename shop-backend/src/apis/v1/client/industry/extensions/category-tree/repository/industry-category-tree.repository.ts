import MySQLService from '@core/libs/mysql/mysql.service'
import { IndustryCategoryTreeModel } from '../model'
import { IIndustryCategoryTreeRepository } from '../interface'
import LoggerService from '@core/libs/logger/logger.system'
import SearchCategoryTreeDto from '../dto/search-industry-category-tree.dto'
import { plainToInstance } from 'class-transformer'
import { BaseRepository } from '@core/repositories'

export default class IndustryCategoryTreeRepository
	extends BaseRepository
	implements IIndustryCategoryTreeRepository
{
	private static readonly SP_FIND_HOME_CATEGORIES =
		'call sp_search_home_categories(?)'

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (
		queries: SearchCategoryTreeDto
	): Promise<IndustryCategoryTreeModel[] | []> => {
		const response = await this.callProcedure<IndustryCategoryTreeModel[]>(
			IndustryCategoryTreeRepository.SP_FIND_HOME_CATEGORIES,
			[JSON.stringify(queries)]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(
			IndustryCategoryTreeModel,
			result as IndustryCategoryTreeModel[],
			{
				excludeExtraneousValues: true
			}
		)
	}
}
