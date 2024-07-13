import { BaseResponse } from '../../../../../@core/interfaces'
import { NotifyModel } from './notify.model'

export interface NotifyResponse extends BaseResponse {
	response: NotifyModel[]
}
