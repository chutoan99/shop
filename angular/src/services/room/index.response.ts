import { Room } from 'src/types/room.model'

export interface RoomResponse {
	err: number
	msg: string
	total: number
	response: Room[]
}
