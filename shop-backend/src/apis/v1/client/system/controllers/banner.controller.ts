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
import { BannerModel } from '../models'
import { IBannerService } from '../interfaces'

export default class BannerController {
	constructor(private readonly _bannerService: IBannerService) {}

	public findAll = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const userId: number = +req.user.id!

			const response: BannerModel[] =
				await this._bannerService.findBanners(userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<BannerModel[]>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: size(response),
					response: response
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
