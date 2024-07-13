import { BaseResponse } from '../../../../@core/interfaces'
import { ShopMallModel } from './shop-mall.model'

export interface ShopMallResponse extends BaseResponse {
	total: string
	response: ShopMallModel[][]
}
