import { BaseResponse } from '../../../../@core/interfaces'
import { FlashSaleModel } from './flash-sale.model'

export interface FlashSaleResponse extends BaseResponse {
	total: string
	response: FlashSaleModel[]
}
