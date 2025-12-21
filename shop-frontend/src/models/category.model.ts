import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface ICategoryTreeModel extends IBaseModel {
	id: number
	parent_cat_id: number
	name: string
	display_name: string
	image: string
	unselected_image: string
	selected_image: string
	level: number
	created_at: Date
	updated_at: Date | null
}

export class CategoryTreeModel extends BaseModel implements ICategoryTreeModel {
	@Expose()
	id!: number

	@Expose()
	parent_cat_id!: number

	@Expose()
	name!: string

	@Expose()
	display_name!: string

	@Expose()
	image!: string

	@Expose()
	unselected_image!: string

	@Expose()
	selected_image!: string

	@Expose()
	level!: number

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
