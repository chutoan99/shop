import { BaseResponse } from '../../../../../@core/interfaces'
import { UserModel } from './user.model'

export interface UserResponse extends BaseResponse {
	access_token: string
	response: UserModel
}
