import { Request, Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	MESSAGE,
	PaginateResponse,
	STATUS_CODE
} from '@core/index'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { SearchPostCommentDto } from '../dto'
import PaginationService from '@core/libs/pagination/pagination.service'
import { IPostCommentService } from '../interface'
import { TreeCommentModel } from '@post/imports'

export default class PostCommentController {
	constructor(private readonly _PostCommentService: IPostCommentService) {}

	public getAll = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const queries: SearchPostCommentDto = plainToClass(
				SearchPostCommentDto,
				req.query
			)

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const pagination = new PaginationService(
				queries.limit,
				queries.page
			)

			const response: TreeCommentModel[] =
				await this._PostCommentService.findPostComments(
					queries,
					pagination
				)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(PaginateResponse<TreeCommentModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					...pagination,
					response
				})
			)
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}
}
