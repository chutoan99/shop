import { Order } from 'src/types/order.model'

export interface OrderResponse {
	err: number
	msg: string
	response: Order[]
}
