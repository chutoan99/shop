import { IsNumber } from 'class-validator'

export class CreateRoomDto {
	@IsNumber()
	shop_id!: number
}
