import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	MESSAGE,
	QueryResponse,
	STATUS_CODE
} from '@core/index'
import { plainToClass, plainToInstance } from 'class-transformer'
import { size } from 'lodash'
import SearchCategoryTreeDto from '../dto/search-industry-category-tree.dto'
import { validate, ValidationError } from 'class-validator'
import IndustryCategoryTreeService from '../service/industry-category-tree.service'
import { IndustryCategoryTreeModel } from '../model'
import { formatIndustryCategory } from '../helper'

export default class IndustryCategoryTreeController {
	constructor(
		private readonly _IndustryCategoryTreeService: IndustryCategoryTreeService
	) {}

	public search = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userId: number = +req.user.id!

			const queries: SearchCategoryTreeDto = plainToInstance(
				SearchCategoryTreeDto,
				req.query
			)

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response: IndustryCategoryTreeModel[] =
				await this._IndustryCategoryTreeService.findAll(queries, userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<IndustryCategoryTreeModel[]>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: size(response),
					response: queries.level
						? formatIndustryCategory(response)
						: response
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
