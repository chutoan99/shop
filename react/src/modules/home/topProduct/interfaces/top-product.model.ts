import { BaseModel } from '../../../../@core/interfaces'

export interface TopProDuctModel extends BaseModel {
	id: number
	data_type: string
	count: number
	name: string
	images: string
	sort_type: number
	best_price: number
	display_text: string
}
