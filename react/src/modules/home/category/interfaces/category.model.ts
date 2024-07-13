import { BaseModel } from '../../../../@core/interfaces'

export interface CategoryTreeModel extends BaseModel {
	id: number
	parent_catid: number
	name: string
	display_name: string
	image: string
	unselected_image: string
	selected_image: string
	level: number
}
