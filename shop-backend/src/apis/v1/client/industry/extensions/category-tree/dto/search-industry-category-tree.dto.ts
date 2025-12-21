import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export default class SearchCategoryTreeDto {
	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	level!: number

	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	parent_cat_id!: number
}
