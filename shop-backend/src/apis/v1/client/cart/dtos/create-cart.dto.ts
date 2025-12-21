import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class variationDto {
	@IsString()
	@IsOptional()
	name!: string

	@IsString()
	@IsOptional()
	option!: string
}

export class CreateCartDto {
	@IsNumber()
	shop_id!: number

	@IsNumber()
	amount!: number

	@IsNumber()
	item_id!: number

	@IsArray()
	@IsOptional()
	variation!: variationDto[]
}
