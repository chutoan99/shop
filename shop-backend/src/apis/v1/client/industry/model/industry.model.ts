import { BaseModel } from '@core/interfaces/models/base-model'
import { Expose } from 'class-transformer'

export class IndustryModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	parent_cat_id!: number

	@Expose()
	level!: number

	@Expose()
	category_name!: string

	@Expose()
	images!: string
}
