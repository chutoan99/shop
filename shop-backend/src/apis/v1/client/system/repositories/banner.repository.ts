import MySQLService from '@core/libs/mysql/mysql.service'

import LoggerService from '@core/libs/logger/logger.system'
import { BannerModel } from '../models'
import { IBannerRepository } from '../interfaces'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class BannerRepository
	extends BaseRepository
	implements IBannerRepository
{
	private static readonly SP_FIND_BANNERS = 'call sp_get_banners()'

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<BannerModel[]> => {
		const response = await this.callProcedure<BannerModel[]>(
			BannerRepository.SP_FIND_BANNERS
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(BannerModel, result as BannerModel[])
	}
}
