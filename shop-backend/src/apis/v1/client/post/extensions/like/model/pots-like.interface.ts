import { BaseModel } from '@core/interfaces/models/base-model'
import { Expose } from 'class-transformer'

export class PostLikeModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	user_id!: number

	@Expose()
	item_id!: number

	@Expose()
	shop_id!: number
}
