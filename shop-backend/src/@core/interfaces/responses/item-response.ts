import { Expose } from 'class-transformer'
import { BaseResponse } from './base-response'

export class ItemResponse<T> extends BaseResponse {
	@Expose()
	response!: T
}
