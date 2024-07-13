import { BaseResponse } from '../../../../@core/interfaces'
import { CategoryTreeModel } from './category.model'

export interface CategoryTreeResponse extends BaseResponse {
	response: CategoryTreeModel[][]
}

export interface CategoryTreeParentResponse extends BaseResponse {
	total: number
	response: CategoryTreeModel[]
}
