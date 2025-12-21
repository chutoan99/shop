import { PaginationAdapter } from '@core/adapters/pagination.adapter'
import { CommentModel } from './comment.model'

export class CommentPaginationAdapter extends PaginationAdapter<CommentModel> {
	constructor(data: any) {
		data.response = data.response.map((item: any) => CommentModel.fromJson(item))
		super(data)
	}
}
