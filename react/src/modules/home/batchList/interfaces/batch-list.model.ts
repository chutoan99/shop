import { BaseModel } from '../../../../@core/interfaces'

export interface BatchListModel extends BaseModel {
	id: number
	banner_image: string
	title: string
	end: String
	start: String
}
