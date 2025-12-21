import { PaginationAdapter } from '@core/adapters/pagination.adapter'
import { MessModel } from './mess.model'

export class MessPaginationAdapter extends PaginationAdapter<MessModel> {
	constructor(data: any) {
		data.response = data.response.map((item: any) => MessModel.fromJson(item))
		super(data)
	}
}
