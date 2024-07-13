import { BaseResponse } from '../../../../@core/interfaces'
import { RoomModel } from './room.model'

export interface RoomsResponse extends BaseResponse {
	total: number
	response: RoomModel[]
}
