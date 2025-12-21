import { Expose } from 'class-transformer'
import { BaseResponse } from './base-response'

export class QueryResponse<T> extends BaseResponse {
	@Expose()
	total!: number

	@Expose()
	response!: T
}
