import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export default class SearchIndustryDto {
	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	page!: number

	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	limit!: number

	@IsString()
	category_name!: string
}
