import { IsOptional, IsString } from 'class-validator'

export class SearchPostCommentDto {
	@IsOptional()
	page!: number

	@IsOptional()
	limit!: number

	@IsString()
	@IsOptional()
	name!: string

	@IsOptional()
	item_id!: number

	@IsOptional()
	shop_id!: number

	@IsOptional()
	order_id!: number
}
