import { MESSAGE } from '@core/resources'
import LoggerService from '@core/libs/logger/logger.system'
import RoomModel from '../schemas/room.schema'
import ChatService from './chat.service'
import ChatModel from '../schemas/chat.schema'
import { generateRoomId } from '@helpers/generateId.helper'
import { SearchRoomDto } from '../dtos/search-room.dto'
import { IUserRepository } from '../../user/interfaces/user.interface'
import { IRoomService, RoomExtra } from '../interfaces'
import { IShopRepository } from '../../shop/interfaces'
import RedisService from '@core/libs/redis/redis.service'
import { CreateRoomDto } from '../dtos/create-room.dto'

export default class RoomService implements IRoomService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _shopRepository: IShopRepository,
		private readonly _userRepository: IUserRepository,
		private readonly _chatService: ChatService
	) {}

	public findAll = async (
		userId: number,
		queries: SearchRoomDto,
		shopId: number
	): Promise<RoomExtra[]> => {
		try {
			const isAdmin = queries.type === 'admin'
			const cacheKey = this._getCacheKey(isAdmin ? shopId : userId)

			this._checkCache(cacheKey)

			const filter = isAdmin ? { shopId } : { userId }

			const rooms: any[] = await RoomModel.find(filter)
			const response = await Promise.all(
				rooms.map(async (room: any) => ({
					...room._doc,
					[isAdmin ? 'user' : 'shop']: await this._fetchExtraData(
						isAdmin ? room.userId : room.shopId,
						isAdmin ? 'user' : 'shop'
					)
				}))
			)

			if (Array.isArray(response)) {
				await this._redisService.setCache(cacheKey, response)
			}

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw new Error(error.message || error)
		}
	}

	public findOne = async (
		roomid: number,
		userId: number,
		shopId?: number
	): Promise<(typeof ChatModel)[] | []> => {
		try {
			const response: (typeof ChatModel)[] | [] =
				await this._chatService.getMessages(roomid, userId, shopId)

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public create = async (
		payload: CreateRoomDto,
		userId: number
	): Promise<any> => {
		try {
			await this.checkExistRoom(userId, payload.shop_id)

			const isCreated = await new RoomModel({
				roomId: generateRoomId(payload.shop_id, userId),
				shopId: payload.shop_id,
				userId,
				isActive: true
			}).save()

			if (!isCreated) {
				throw new Error(MESSAGE.CREATE.FAIL)
			}

			this._redisService.setCache(this._getCacheKey(userId), null)

			return isCreated
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public checkExistRoom = async (userId: number, shopId: number) => {
		try {
			const existingRoom: typeof RoomModel | null =
				await RoomModel.findOne({
					shopId,
					userId
				})

			if (existingRoom) {
				throw new Error(MESSAGE.ROOM.IS_ALREADY)
			}
		} catch (error: any) {
			this._loggerService.error(error.message || error)
			throw Error(error.message || error)
		}
	}

	private async _checkCache(cacheKey: string) {
		return await this._redisService.getCache(cacheKey)
	}

	private _getCacheKey(userId: number): string {
		return `room-${userId}`
	}

	private async _fetchExtraData(id: number, type: 'user' | 'shop') {
		if (type === 'user') {
			const user = await this._userRepository.findByID(id)
			return {
				id: user.id,
				name: user.name,
				username: user.username,
				avatar: user.avatar
			}
		} else {
			const shop = await this._shopRepository.find(id)
			return {
				id: shop.id,
				name: shop.name,
				username: shop.username,
				portrait: shop.portrait,
				last_active_time: shop.last_active_time,
				is_official_shop: shop.is_official_shop
			}
		}
	}
}
