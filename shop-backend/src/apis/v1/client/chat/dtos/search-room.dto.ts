import { IsIn, IsString } from 'class-validator'

export class SearchRoomDto {
	@IsIn(['client', 'admin'])
	@IsString()
	type!: string
}
