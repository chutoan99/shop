import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'

import { SuggestSearchModel } from '../models'
import { ISuggestSearchRepository } from '../interfaces'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class SuggestSearchRepository
	extends BaseRepository
	implements ISuggestSearchRepository
{
	private static readonly SP_FIND_SUGGESTS_SEARCH =
		'call sp_get_suggests_search()'

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<SuggestSearchModel[]> => {
		const response = await this.callProcedure<SuggestSearchModel[]>(
			SuggestSearchRepository.SP_FIND_SUGGESTS_SEARCH
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(
			SuggestSearchModel,
			result as SuggestSearchModel[]
		)
	}
}
