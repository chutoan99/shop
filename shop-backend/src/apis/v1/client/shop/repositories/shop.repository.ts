import MySQLService from '@core/libs/mysql/mysql.service'
import LoggerService from '@core/libs/logger/logger.system'
import { PostModel } from '../../post/models'
import { ShopModel } from '../models'
import { IShopRepository } from '../interfaces'
import { plainToClass, plainToInstance } from 'class-transformer'
import { BaseRepository } from '@core/repositories'

export default class ShopRepository
	extends BaseRepository
	implements IShopRepository
{
	private static readonly SP_FIND_ITEMS_SHOP = `call sp_get_shop_posts(?)`
	private static readonly SP_FIND_DETAIL = `call sp_get_shop_detail(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findItems = async (id: number): Promise<PostModel[]> => {
		const response = await this.callProcedure<PostModel[]>(
			ShopRepository.SP_FIND_ITEMS_SHOP,
			[id]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToInstance(PostModel, result as PostModel[], {
			excludeExtraneousValues: true
		})
	}

	public find = async (id: number): Promise<ShopModel> => {
		const response = await this.callProcedure<ShopModel[]>(
			ShopRepository.SP_FIND_DETAIL,
			[id]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToClass(ShopModel, (result as ShopModel[])[0], {
			excludeExtraneousValues: true
		})
	}
}
