import { Response } from 'express'
import {
	BaseErrors,
	ItemResponse,
	CommandResponse,
	MESSAGE,
	STATUS_CODE,
	AuthenticatedRequest
} from '@core/index'
import { plainToClass, plainToInstance } from 'class-transformer'
import { UpdateUserDto } from '../dtos'
import { validate, ValidationError } from 'class-validator'
import { IUserService } from '../interfaces/user.interface'
import CloudINaryService from '@core/libs/uploads/services/cloudinary.service'
import { UserModel } from '../models'

export default class UserController {
	constructor(
		private readonly _userService: IUserService,
		private readonly _cloudINaryService: CloudINaryService
	) {}

	public findUser = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const userId: number = +req.user.id!

			const response = await this._userService.findUser(userId)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(ItemResponse<UserModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					response: response
				})
			)
		} catch (error) {
			BaseErrors.internalServerError(res)
		}
	}

	public updateCurrent = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		// const fileData = req.file
		const payload: UpdateUserDto = plainToInstance(UpdateUserDto, req.body)
		try {
			// if (!isEmpty(fileData)) {
			// 	payload.avatar = fileData.path
			// 	payload.filename = fileData.filename
			// }

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			payload.id = +req.user.id!

			await this._userService.updateUser(payload.email, payload)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				})
			)
		} catch (error) {
			// if (fileData) this._cloudINaryService.deleteFile(fileData.filename)
			BaseErrors.internalServerError(res)
		}
	}
}
