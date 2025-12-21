import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export default class SearchUserManagementDto {
	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	page!: number

	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	limit!: number
}
