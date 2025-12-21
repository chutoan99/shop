import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class PostTopProductModel extends BaseModel {
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
}
