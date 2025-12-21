import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class SearchPostHistoryTrackingDto {
	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	userId!: number
}
