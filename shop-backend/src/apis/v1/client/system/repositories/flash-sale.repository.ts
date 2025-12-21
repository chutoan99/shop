import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'

import { FlashSaleModel } from '../models'
import { IFlashSaleRepository } from '../interfaces'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'

export default class FlashSaleRepository
	extends BaseRepository
	implements IFlashSaleRepository
{
	private static readonly SP_FIND_FLASH_SALES = 'call sp_get_flash_sales()'

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findAll = async (): Promise<FlashSaleModel[]> => {
		const response = await this.callProcedure<FlashSaleModel[]>(
			FlashSaleRepository.SP_FIND_FLASH_SALES
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(FlashSaleModel, result as FlashSaleModel[])
	}
}
