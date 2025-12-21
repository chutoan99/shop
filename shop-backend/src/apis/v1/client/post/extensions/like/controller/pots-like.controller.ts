import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	CommandResponse,
	MESSAGE,
	QueryResponse,
	STATUS_CODE
} from '@core/index'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { size } from 'lodash'
import LoggerService from '@core/libs/logger/logger.system'
import { PostLikeModel } from '../model'
import { CreatePostLikeDto } from '../dto'
import { IPostLikeService } from '../interface'
export default class PostLikeController {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _postLikeService: IPostLikeService
	) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userid: number = +req.user.id!

			const response = await this._postLikeService.findLikes(userid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<PostLikeModel[]>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: size(response),
					response: response
				})
			)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public create = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: CreatePostLikeDto = plainToInstance(
				CreatePostLikeDto,
				req.body
			)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._postLikeService.createLike(payload, +req.user.id!)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				})
			)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public delete = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			await this._postLikeService.deleteLike(req.params.id)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.DELETE.SUCCESS
				})
			)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
