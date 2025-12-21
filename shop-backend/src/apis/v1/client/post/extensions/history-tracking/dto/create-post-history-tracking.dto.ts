import { IsString } from 'class-validator'

export class CreatePostHistoryTrackingDto {
	@IsString()
	text!: string
}
