import { Request, Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	ItemResponse,
	MESSAGE,
	PaginateResponse,
	PaginateResponseV2,
	STATUS_CODE
} from '@core/index'
import { validate, ValidationError } from 'class-validator'
import PaginationService from '@core/libs/pagination/pagination.service'
import { PostBaseModel, PostModel } from '../models'
import SearchPostDto from '../dtos/search-post.dto'
import { plainToClass, plainToInstance } from 'class-transformer'
import { IPostService } from '../interfaces'
export default class PostController {
	constructor(private readonly _postService: IPostService) {}

	public search = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const userid: number = +req.user.id!

			const queries: SearchPostDto = plainToInstance(
				SearchPostDto,
				req.query
			)

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response = await this._postService.search(queries)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(PaginateResponseV2<PostBaseModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					...response
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public find = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const response = await this._postService.findPostId(
				+req.params.itemId
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(
					ItemResponse<PostModel>,
					{
						err: 0,
						msg: MESSAGE.GET.SUCCESS,
						response: response
					},
					{ excludeExtraneousValues: true }
				)
			)
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}
}
