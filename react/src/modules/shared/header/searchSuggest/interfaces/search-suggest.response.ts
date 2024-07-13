import { BaseResponse } from '../../../../../@core/interfaces'
import { SearchSuggestModel } from './search-suggest.model'

export interface SearchSuggestResponse extends BaseResponse {
	response: SearchSuggestModel[]
}
