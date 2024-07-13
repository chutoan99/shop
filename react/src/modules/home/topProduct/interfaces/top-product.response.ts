import { BaseResponse } from '../../../../@core/interfaces'
import { TopProDuctModel } from './top-product.model'

export interface TopProDuctsResponse extends BaseResponse {
	response: TopProDuctModel[]
}
