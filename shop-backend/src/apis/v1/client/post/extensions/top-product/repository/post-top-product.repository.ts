import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'

import { PostTopProductModel } from '../model'
import { IPostTopProductRepository } from '../interface'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class PostTopProductRepository
	extends BaseRepository
	implements IPostTopProductRepository
{
	private static readonly SP_GET_TOP_PRODUCTS = 'call sp_get_top_products()'
	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<PostTopProductModel[]> => {
		const response = await this.callProcedure<PostTopProductModel[]>(
			PostTopProductRepository.SP_GET_TOP_PRODUCTS
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(
			PostTopProductModel,
			result as PostTopProductModel[],
			{
				excludeExtraneousValues: true
			}
		)
	}
}
