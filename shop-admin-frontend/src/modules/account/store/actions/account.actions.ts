import { ActionType, createAction, props } from '@ngrx/store'

export const GET_INFO_ACCOUNT = '@InfoAccount/GetStart'
export const GET_INFO_ACCOUNT_SUCCESS = '@InfoAccount/GetSuccess'
export const GET_INFO_ACCOUNT_FAILED = '@InfoAccount/GetFailed'

export const getInfoAccount = createAction(GET_INFO_ACCOUNT)
export const getInfoAccountSuccess = createAction(GET_INFO_ACCOUNT_SUCCESS, props<any>())
export const getInfoAccountFailed = createAction(GET_INFO_ACCOUNT_FAILED, props<any>())

export type AccountActions =
	| ActionType<typeof getInfoAccount>
	| ActionType<typeof getInfoAccountSuccess>
	| ActionType<typeof getInfoAccountFailed>
