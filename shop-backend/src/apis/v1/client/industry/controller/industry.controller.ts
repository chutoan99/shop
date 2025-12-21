import { Request, Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	MESSAGE,
	PaginateResponse,
	QueryResponse,
	STATUS_CODE
} from '@core/index'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { size } from 'lodash'
import { IndustryModel } from '../model'
import PaginationService from '@core/libs/pagination/pagination.service'
import { PostBaseModel } from '../../post/models'
import SearchIndustryDto from '../dto/search-industry.dto'
import { IIndustryService } from '../interface'

export default class IndustryController {
	constructor(private readonly _industryService: IIndustryService) {}
	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userId: number = +req.user.id!

			const response: IndustryModel[] =
				await this._industryService.findIndustries(userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<IndustryModel[]>, {
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

	public search = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const queries: SearchIndustryDto = plainToInstance(
				SearchIndustryDto,
				req.query
			)

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const pagination = new PaginationService(
				queries.limit,
				queries.page
			)

			const response: PostBaseModel[] =
				await this._industryService.searchPosts(queries, pagination)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(PaginateResponse<PostBaseModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					...pagination,
					response: response
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
