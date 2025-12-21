import { BaseModel, RecordsWithCount } from '@core/interfaces'
import { Transform } from 'class-transformer'
import { IsIn, IsOptional, IsString } from 'class-validator'

export abstract class BaseSearchDto {
	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	page!: number

	@IsOptional()
	@Transform(({ value }) => Number(value) || 0)
	limit!: number

	@IsString()
	@IsOptional()
	orderBy!: string

	@IsIn(['ASC', 'DESC'])
	@IsString()
	@IsOptional()
	orderType: any = 'DESC'

	@IsOptional()
	@IsString()
	key!: string

	abstract storeProcedure: string

	abstract getSearchQuery(): Promise<RecordsWithCount<BaseModel>>

	getPaginationOptions(): { page: number; limit: number } {
		return { page: this.page, limit: this.limit }
	}

	hasSearchKeyword() {
		return this.key && this.key.length > 0
	}

	hasPagination() {
		return this.page && this.limit
	}
}
