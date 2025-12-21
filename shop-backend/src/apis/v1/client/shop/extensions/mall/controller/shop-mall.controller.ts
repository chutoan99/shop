import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	MESSAGE,
	QueryResponse,
	STATUS_CODE
} from '@core/index'
import { size } from 'lodash'
import { plainToClass } from 'class-transformer'
import { formatShopMall } from '../helper'
import { ShopMallModel } from '../model'
import { IShopMallService } from '../interface'

export default class ShopMallController {
	constructor(private readonly _shopMallService: IShopMallService) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userId: number = +req.user.id!

			const response: ShopMallModel[] =
				await this._shopMallService.findShopMalls(userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<ShopMallModel[]>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: size(response),
					response: formatShopMall(response)
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
