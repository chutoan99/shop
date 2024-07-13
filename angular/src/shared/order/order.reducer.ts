import { createReducer, on } from '@ngrx/store'
import * as OrderActions from './order.actions'
import { Order } from '../../types/order.model'

export interface OrderState {
	items: Order[]
	success: boolean
	error: boolean | string
}

const initialState: OrderState = {
	items: [],
	success: false,
	error: false
}

export const OrderReducer = createReducer(
	initialState,

	on(OrderActions.getAllStart, (state: OrderState) => ({
		...state
	})),

	on(OrderActions.getAllSuccess, (state: OrderState, action: any) => ({
		...state,
		success: true,
		items: action
	})),

	on(OrderActions.getAllFailed, (state: OrderState, action: any) => ({
		items: [],
		success: false,
		error: action.error
	}))
)
