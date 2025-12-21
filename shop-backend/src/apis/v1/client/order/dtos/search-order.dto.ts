import { Transform } from 'class-transformer'
import { IsString } from 'class-validator'
import { IsOptional } from 'class-validator'

export default class SearchOrderDto {
	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	type!: number

	@IsString()
	shop_name!: string

	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	userId!: number
}
