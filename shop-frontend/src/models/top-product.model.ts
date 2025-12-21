import { Expose } from 'class-transformer'
import { BaseModel, IBaseModel } from '@core/interfaces'

export interface ITopProductModel extends IBaseModel {
	id: number
	data_type: string
	count: number
	name: string
	images: string
	sort_type: number
	best_price: number
	display_text: string
	created_at: Date
	updated_at: Date | null
}

export class TopProductModel extends BaseModel implements ITopProductModel {
	@Expose()
	id!: number

	@Expose()
	data_type!: string

	@Expose()
	count!: number

	@Expose()
	name!: string

	@Expose()
	images!: string

	@Expose()
	sort_type!: number

	@Expose()
	best_price!: number

	@Expose()
	display_text!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
