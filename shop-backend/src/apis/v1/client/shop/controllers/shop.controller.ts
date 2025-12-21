import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	ItemResponse,
	MESSAGE,
	QueryResponse,
	STATUS_CODE
} from '@core/index'
import { plainToClass } from 'class-transformer'
import { ShopModel } from '../models'
import { size } from 'lodash'
import { PostModel } from '../../post/models'
import { IShopService } from '../interfaces'

export default class ShopController {
	constructor(private readonly _shopService: IShopService) {}

	public findItems = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const userId: number = +req.user.id!

			const response: PostModel[] = await this._shopService.findShopItems(
				+req.params.shopId,
				userId
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<PostModel[]>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: size(response),
					response: response
				})
			)
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}

	public find = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const userId: number = +req.user.id!

			const response: ShopModel = await this._shopService.findShop(
				+req.params.shopId,
				userId
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(ItemResponse<ShopModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					response: response
				})
			)
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}
}
