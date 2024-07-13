import { BaseResponse } from '../../../../@core/interfaces'
import { BatchListModel } from './batch-list.model'

export interface BatchListResponse extends BaseResponse {
	total: string
	response: BatchListModel[]
}
