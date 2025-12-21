import { Expose } from 'class-transformer'
import { RoomModel } from '../models/room.model'

export class RoomResponse {
	@Expose()
	err!: number

	@Expose()
	msg!: string

	@Expose()
	total!: number

	@Expose()
	response!: RoomModel[]
}
