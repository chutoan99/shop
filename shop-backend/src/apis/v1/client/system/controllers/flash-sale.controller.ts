import { Response } from 'express'
import { MESSAGE, STATUS_CODE } from '@core/resources'
import { plainToClass } from 'class-transformer'
import { size } from 'lodash'
import { FlashSaleModel } from '../models'
import { AuthenticatedRequest, BaseErrors, QueryResponse } from '@core/index'
import { IFlashSaleService } from '../interfaces'

export default class FlashSaleController {
	constructor(private readonly _flashSaleService: IFlashSaleService) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userId: number = +req.user.id!

			const response: FlashSaleModel[] =
				await this._flashSaleService.findFlashSales(userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<FlashSaleModel[]>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: size(response),
					response
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
