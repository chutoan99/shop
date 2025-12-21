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
import NotifyModel from '../schemas/notify.schema'
import { INotifyService } from '../interfaces'

export default class NotifyController {
	constructor(private readonly _notifyService: INotifyService) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userid: number = +req.user.id!

			const response: (typeof NotifyModel)[] =
				await this._notifyService.findAll(userid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<(typeof NotifyModel)[]>, {
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
