import ChatModel from '../schemas/chat.schema'
import { ShopBase } from '../../shop/models'
import { UserModel } from '../../user/models'
import { CreateRoomDto } from '../dtos'
import { SearchRoomDto } from '../dtos/search-room.dto'
import { IRoom } from '@chat/schemas'

export type RoomExtra = IRoom & {
	shop?: ShopBase
	user?: UserModel
}

export interface IRoomService {
	findAll(
		userId: number,
		queries: SearchRoomDto,
		shopId?: number
	): Promise<RoomExtra[]>
	findOne(
		roomid: number,
		userId: number,
		shopId: number
	): Promise<(typeof ChatModel)[] | []>
	create(payload: CreateRoomDto, userId: number): Promise<any>
	checkExistRoom(userId: number, shopId: number): Promise<void>
}
