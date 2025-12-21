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
import ChatModel from '../schemas/chat.schema'
import { SearchRoomDto } from '../dtos/search-room.dto'
import { IRoomService, RoomExtra } from '../interfaces'
import { CreateRoomDto } from '../dtos'
export default class RoomController {
	constructor(private readonly _roomService: IRoomService) {}

	public findAll = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const queries: SearchRoomDto = plainToInstance(
				SearchRoomDto,
				req.query
			)

			const errors: ValidationError[] = await validate(queries)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response: RoomExtra[] = await this._roomService.findAll(
				+req.user.id!,
				queries,
				+req.user.shop_id!
			)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(QueryResponse<RoomExtra[]>, {
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

	public findOne = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response: (typeof ChatModel)[] | [] =
				await this._roomService.findOne(
					+req.params.roomId,
					+req.user.id!,
					+req.user.shop_id!
				)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public create = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: CreateRoomDto = plainToInstance(
				CreateRoomDto,
				req.body
			)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._roomService.create(payload, +req.user.id!)

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
