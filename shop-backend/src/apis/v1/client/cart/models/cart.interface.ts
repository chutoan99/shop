import { BaseModel } from '@core/interfaces'
import { Expose, Transform } from 'class-transformer'
import { variationDto } from '../dtos'
import { PostBaseModel, Variation } from '../../post/models'

export class CartBaseModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	shop_id!: number

	@Expose()
	amount!: number

	@Expose()
	user_id!: number

	@Expose()
	item_id!: number

	@Expose()
	@Transform(
		({ value }) => (Array.isArray(value) ? JSON.stringify(value) : value),
		{ toPlainOnly: true } // Chỉ áp dụng khi serialize (xuất ra)
	)
	@Transform(
		({ value }) => (typeof value === 'string' ? JSON.parse(value) : value),
		{ toClassOnly: true } // Chỉ áp dụng khi deserialize (chuyển từ DB về class)
	)
	variation!: variationDto[]
}

class overviewCart extends PostBaseModel {
	@Expose()
	variations!: Variation[]
}

export class CartModel extends CartBaseModel {
	@Expose()
	overview!: overviewCart
}
