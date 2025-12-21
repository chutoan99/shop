import { IsNumber, IsString } from 'class-validator'

export class CreateCommentDto {
	@IsNumber()
	order_id!: number

	@IsNumber()
	item_id!: number

	@IsNumber()
	shop_id!: number

	@IsString()
	images!: string

	@IsString()
	comment!: string

	@IsString()
	tier_variation!: string

	@IsString()
	list_option!: string

	@IsNumber()
	rating_star!: number
}
