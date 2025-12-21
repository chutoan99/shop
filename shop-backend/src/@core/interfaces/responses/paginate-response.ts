import { Expose, Type } from 'class-transformer'
import { BaseResponse } from './base-response'

export class PaginateResponse<T> extends BaseResponse {
	@Expose()
	offset!: number

	@Expose()
	limit!: number

	@Expose()
	total!: number

	@Expose()
	totalPage!: number

	@Expose()
	currentPage!: number

	@Expose()
	response!: T[]
}

export class PaginateResponseV2<T> extends BaseResponse {
	@Expose()
	response!: T[]

	@Expose()
	meta!: {
		offset: number
		limit: number
		total: number
		totalPage: number
		currentPage: number
	}
}
