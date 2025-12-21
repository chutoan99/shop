import { IsNumber } from 'class-validator'

export class CreatePostLikeDto {
	@IsNumber()
	item_id!: number

	@IsNumber()
	shop_id!: number
}
