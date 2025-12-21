import { PaginationAdapter } from '@core/adapters/pagination.adapter'
import { RoomModel } from '../models'

export class RoomPaginationAdapter extends PaginationAdapter<RoomModel> {
	constructor(data: any) {
		data.response = data.response.map((item: any) => RoomModel.fromJson(item))
		super(data)
	}
}
