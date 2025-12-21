import { BaseModel } from '@core/interfaces/models/base-model'
import { Expose } from 'class-transformer'

export class ShopMallModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	url!: string

	@Expose()
	image!: string

	@Expose()
	promo_text!: string
}
