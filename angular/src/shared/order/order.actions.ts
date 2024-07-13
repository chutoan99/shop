import { ActionType, createAction, props } from '@ngrx/store'
import { Order } from '../../types/order.model'

export const GET_ORDER_START = '@Order/GetAll'
export const GET_ORDER_SUCCESS = '@Order/GetAllSuccess'
export const GET_ORDER_FAILED = '@Order/GetAllFailed'

export const getAllStart = createAction(GET_ORDER_START)
export const getAllSuccess = createAction(GET_ORDER_SUCCESS, props<{ ORDER: Comment[] }>())
export const getAllFailed = createAction(GET_ORDER_FAILED, props<{ error?: string }>())

export type OrderActions =
	| ActionType<typeof getAllStart>
	| ActionType<typeof getAllSuccess>
	| ActionType<typeof getAllFailed>
