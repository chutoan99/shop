import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'

import { ShopMallModel } from '../model'
import { IShopMallRepository } from '../interface'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class ShopMallRepository
	extends BaseRepository
	implements IShopMallRepository
{
	private static readonly SP_GET_SHOP_MALLS = 'call sp_get_shop_malls()'
	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<ShopMallModel[]> => {
		const response = await this.callProcedure<ShopMallModel[]>(
			ShopMallRepository.SP_GET_SHOP_MALLS
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(ShopMallModel, result as ShopMallModel[], {
			excludeExtraneousValues: true
		})
	}
}
