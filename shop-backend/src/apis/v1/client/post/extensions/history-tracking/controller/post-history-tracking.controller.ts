import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	MESSAGE,
	QueryResponse,
	STATUS_CODE
} from '@core/index'
import { plainToClass } from 'class-transformer'
import { size } from 'lodash'
import { PostHistoryTrackingModel } from '../model'
import { IPostHistoryTrackingService } from '../interface'

export default class PostHistoryTrackingController {
	constructor(
		private readonly _postHistoryTrackingService: IPostHistoryTrackingService
	) {}

	findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response: PostHistoryTrackingModel[] =
				await this._postHistoryTrackingService.findAll(+req.user.id!)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<PostHistoryTrackingModel[]>, {
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
