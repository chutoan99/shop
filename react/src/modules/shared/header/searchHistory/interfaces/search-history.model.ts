import { BaseModel } from '../../../../../@core/interfaces'

export interface SearchHistoryModel extends BaseModel {
	id: number
	userid: number
	text: string
}
