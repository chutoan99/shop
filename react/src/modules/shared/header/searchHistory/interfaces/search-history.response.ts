import { BaseResponse } from '../../../../../@core/interfaces'
import { SearchHistoryModel } from './search-history.model'

export interface SearchHistoryResponse extends BaseResponse {
	response: SearchHistoryModel[]
}
