import { BaseResponse } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class LoginResponse extends BaseResponse {
	@Expose()
	access_token!: string

	@Expose()
	refresh_token?: string
}
