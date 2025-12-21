import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IShopMallModel extends IBaseModel {
	id: number
	image: string
	url: string
	promo_text: string
	created_at: Date
	updated_at: Date | null
}

export class ShopMallModel extends BaseModel implements IShopMallModel {
	@Expose()
	id!: number

	@Expose()
	image!: string

	@Expose()
	url!: string

	@Expose()
	promo_text!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
