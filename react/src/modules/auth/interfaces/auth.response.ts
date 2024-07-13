import { BaseResponse } from '../../../@core/interfaces'

export interface LoginResponse extends BaseResponse {
	access_token: string | null
}
export interface RegisterResponse extends BaseResponse {}
