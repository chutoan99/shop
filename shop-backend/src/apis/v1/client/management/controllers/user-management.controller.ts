import { Response } from 'express'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import {
	AuthenticatedRequest,
	BaseErrors,
	CommandResponse,
	MESSAGE,
	PaginateResponse,
	STATUS_CODE
} from '@core/index'
import { CreateInvitationDto, UpdateRoleDto } from '../dtos/user-management.dto'
import { IUserManagementService } from '../interfaces/user-management.interface'
import PaginationService from '@core/libs/pagination/pagination.service'
import SearchUserManagementDto from '../dtos/search-user-management.dto'
import { UserManagementModel } from '../models/user-management.model'

export default class UserManagementController {
	constructor(
		private readonly _userManagementService: IUserManagementService
	) {}

	public getUserManagements = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const shopId: number = +req.shop.id!

			const queries: SearchUserManagementDto = plainToInstance(
				SearchUserManagementDto,
				req.query
			)

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const pagination = new PaginationService(
				queries.limit,
				queries.page
			)

			const response: UserManagementModel[] =
				await this._userManagementService.getUserManagements(
					queries,
					shopId,
					pagination
				)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(PaginateResponse<UserManagementModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					...pagination,
					response
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res)
		}
	}

	public inviteUser = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const payload = plainToClass(CreateInvitationDto, {
				...req.body,
				shopId: +req.params.shopId
			})

			const errors = await validate(payload)
			if (errors.length > 0) {
				return BaseErrors.badRequest(errors[0].constraints, res)
			}

			await this._userManagementService.inviteUser(
				+req.params.shopId,
				+req.user.id!,
				payload
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res)
		}
	}

	public acceptInvitation = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			await this._userManagementService.acceptInvitation(
				+req.user.id!,
				req.params.token
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res)
		}
	}

	public removeUser = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			await this._userManagementService.removeUser(
				+req.params.shopId,
				+req.params.targetUserId,
				+req.user.id!
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.DELETE.SUCCESS
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res)
		}
	}

	public updateUserRole = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const payload = plainToClass(UpdateRoleDto, req.body)

			const errors = await validate(payload)
			if (errors.length > 0) {
				return BaseErrors.badRequest(errors[0].constraints, res)
			}

			await this._userManagementService.updateUserRole(
				+req.params.shopId,
				+req.params.targetUserId,
				payload,
				+req.user.id!
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res)
		}
	}
}
