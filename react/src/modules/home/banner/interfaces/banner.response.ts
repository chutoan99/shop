import { BaseResponse } from '../../../../@core/interfaces'
import { BannerModel } from './banner.model'

export interface BannerResponse extends BaseResponse {
	total: string
	response: BannerModel[]
}
