import { BaseModel } from '../../../../../@core/interfaces'

export interface SearchSuggestModel extends BaseModel {
	id: number
	text: string
	count: number
}
