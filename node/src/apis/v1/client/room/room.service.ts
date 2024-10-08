import MESSAGE from '~/@core/contains/message.json'
import { generateRoomId } from '~/helpers/generateId'
import RoomRepository from './room.repository'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import { RoomResponse } from './room.response'
import RedisSystem from '~/systems/redis/redis.system'
import { BaseResponse } from '~/systems/other/response.system'
import { LoggerSystem } from '~/systems/logger'
import { RoomModel } from './room.model'
import { CreateRoomDto } from './room.dto'

interface IRoomService {
	findRooms(userid: number): Promise<RoomResponse>
	checkExistRoom(
		userid: number,
		shopid: number
	): Promise<BaseResponse | undefined>
	createRoom(payload: CreateRoomDto, userid: number): Promise<BaseResponse>
}

export default class RoomService implements IRoomService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _roomRepository: RoomRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._redisSystem = new RedisSystem()
		this._roomRepository = new RoomRepository()
	}

	public findRooms = async (userid: number): Promise<RoomResponse> => {
		try {
			let total = 0
			const cacheKey: string = `room-${userid}`
			const cachedData = await this._redisSystem.getCache(cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}
			const response: RoomModel[] | [] =
				await this._roomRepository.findAll(userid)
			if (_.isArray(response)) {
				total = response.length
				await this._redisSystem.setCache(cacheKey, response)
			}
			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public createRoom = async (
		payload: CreateRoomDto,
		userid: number
	): Promise<BaseResponse> => {
		try {
			const checkResult = await this.checkExistRoom(
				userid,
				payload.shopid
			)
			if (checkResult) {
				return checkResult
			}
			const newRoom = Builder<RoomModel>()
				.id(generateRoomId(+userid, payload.shopid))
				.shopid(payload.shopid)
				.userid(userid)
				.build()

			const isCreated: boolean = await this._roomRepository.create(
				newRoom
			)

			if (!isCreated) {
				return {
					err: 1,
					msg: MESSAGE.CREATE.FAIL
				}
			}
			return {
				err: 0,
				msg: MESSAGE.CREATE.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public checkExistRoom = async (userid: number, shopid: number) => {
		const existingRoom: RoomModel = await this._roomRepository.find(
			shopid,
			userid
		)
		if (existingRoom) {
			return {
				err: 1,
				msg: MESSAGE.ROOM.IS_ALREADY
			}
		}
	}
}
