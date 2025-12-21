import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class IndustryCategoryTreeModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	display_name!: string

	@Expose()
	parent_catid!: number

	@Expose()
	name!: string

	@Expose()
	image!: string

	@Expose()
	unselected_image!: string

	@Expose()
	selected_image!: string

	@Expose()
	level!: number
}
