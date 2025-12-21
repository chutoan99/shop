import { Response } from 'express'
import {
	AuthenticatedRequest,
	BaseErrors,
	CommandResponse,
	MESSAGE,
	STATUS_CODE
} from '@core/index'
import { validate, ValidationError } from 'class-validator'
import { plainToClass, plainToInstance } from 'class-transformer'
import { CreateCommentDto } from '../dto'
import CloudINaryService from '@core/libs/uploads/services/cloudinary.service'
import { IOrderCommentService } from '../interface'

export default class OrderCommentController {
	constructor(
		private readonly _orderCommentService: IOrderCommentService,
		private readonly _cloudINaryService: CloudINaryService
	) {}

	public create = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const imageUrls: string[] =
				await this._cloudINaryService.uploadFiles(req.files)

			const payload: CreateCommentDto = plainToInstance(
				CreateCommentDto,
				req.body
			)

			if (imageUrls.length) {
				payload.images = JSON.stringify(imageUrls)
			}

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response = await this._orderCommentService.createComment(
				+req.user.id!,
				payload
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				})
			)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
