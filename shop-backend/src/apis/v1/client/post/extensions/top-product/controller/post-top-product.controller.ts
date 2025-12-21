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
import { PostTopProductModel } from '../model'
import { IPostTopProductService } from '../interface'
export default class PostTopProductController {
	constructor(
		private readonly _postTopProductService: IPostTopProductService
	) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userid: number = +req.user.id!

			const response: PostTopProductModel[] =
				await this._postTopProductService.findAll(userid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<PostTopProductModel[]>, {
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
