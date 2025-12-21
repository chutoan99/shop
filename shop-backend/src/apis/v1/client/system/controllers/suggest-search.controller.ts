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
import { SuggestSearchModel } from '../models'
import { ISuggestSearchService } from '../interfaces'

export default class SuggestSearchController {
	constructor(
		private readonly _suggestSearchService: ISuggestSearchService
	) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userId: number = +req.user.id!

			const response: SuggestSearchModel[] =
				await this._suggestSearchService.findAll(userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<SuggestSearchModel[]>, {
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
