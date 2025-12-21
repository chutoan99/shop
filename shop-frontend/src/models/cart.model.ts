import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose, Type } from 'class-transformer'
import { PostBaseModel } from './post-base.model'
import { VariationModel } from './post-detail.model'

export class VariationCartModel {
	@Expose()
	name!: string | ''

	@Expose()
	option!: string | ''
}

export class CartOverviewModel extends PostBaseModel {
	@Expose()
	variations!: VariationModel[]
}

export interface ICartModel extends IBaseModel {
	id: number
	user_id: number
	item_id: number
	shop_id: number
	amount: number
	variation: VariationCartModel[]
	overview: CartOverviewModel
}

export class CartModel extends BaseModel implements ICartModel {
	@Expose()
	id!: number

	@Expose()
	user_id!: number

	@Expose()
	item_id!: number

	@Expose()
	shop_id!: number

	@Expose()
	amount!: number

	@Expose()
	@Type(() => VariationCartModel)
	variation!: VariationCartModel[]

	@Expose()
	@Type(() => CartOverviewModel)
	overview!: CartOverviewModel

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
