import { BaseModel } from '../../../../@core/interfaces'

export interface ShopMallModel extends BaseModel {
	id: number
	image: string
	url: string
	promo_text: string
}
