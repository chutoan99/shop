import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'
import { IBatchListRepository } from '../interfaces'
import { BatchListModel } from '../models'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class BatchListRepository
	extends BaseRepository
	implements IBatchListRepository
{
	private static readonly SP_FIND_BATCH_LIST = 'call sp_get_batch_lists()'

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<BatchListModel[]> => {
		const response = await this.callProcedure<BatchListModel[]>(
			BatchListRepository.SP_FIND_BATCH_LIST
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(BatchListModel, result as BatchListModel[])
	}
}
