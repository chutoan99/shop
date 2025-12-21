import { Response } from 'express'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import {
	BaseErrors,
	ItemResponse,
	CommandResponse,
	MESSAGE,
	STATUS_CODE,
	AuthenticatedRequest
} from '@core/index'
import { IGroupService } from '../interface/group.interface'
import { GroupModel } from '../models/group.model'
import { CreateGroupDto, UpdateGroupDto } from '../dtos'

export default class GroupController {
	constructor(private readonly _groupService: IGroupService) {}

	public findAll = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const data = await this._groupService.getGroups()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json({
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: data
			})
		} catch (err) {
			BaseErrors.internalServerError(res)
		}
	}

	public findById = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const id = Number(req.params.id)
			const data = await this._groupService.getGroupById(id)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(ItemResponse<GroupModel>, {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					response: data
				})
			)
		} catch (err) {
			BaseErrors.internalServerError(res)
		}
	}

	public create = async (req: AuthenticatedRequest, res: Response) => {
		const payload = plainToInstance(CreateGroupDto, req.body)
		try {
			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._groupService.createGroup(payload)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				})
			)
		} catch (err) {
			BaseErrors.internalServerError(res)
		}
	}

	public update = async (req: AuthenticatedRequest, res: Response) => {
		const payload = plainToInstance(UpdateGroupDto, req.body)
		try {
			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._groupService.updateGroup(payload)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				})
			)
		} catch (err) {
			BaseErrors.internalServerError(res)
		}
	}

	public delete = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const id = Number(req.params.id)
			await this._groupService.deleteGroup(id)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.DELETE.SUCCESS
				})
			)
		} catch (err) {
			BaseErrors.internalServerError(res)
		}
	}
}
