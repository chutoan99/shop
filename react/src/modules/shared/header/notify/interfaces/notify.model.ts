import { BaseModel } from '../../../../../@core/interfaces'

export interface NotifyModel extends BaseModel {
	id: number
	image: string
	title: string
	content: string
	userid: null
	seen: number
	time: string
}
