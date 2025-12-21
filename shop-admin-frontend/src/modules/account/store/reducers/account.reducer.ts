import { createReducer, on } from '@ngrx/store'
import * as InfoShopActions from '../actions'
import { AccountInfoModel } from '@modules/account/models'

export interface InfoAccountState {
	items: AccountInfoModel
	success: boolean
	error: string | boolean
}

const initialState: InfoAccountState = {
	items: {} as AccountInfoModel,
	success: false,
	error: false
}

export const infoShopReducer = createReducer(
	initialState,
	on(InfoShopActions.getInfoAccount, (state: InfoAccountState) => ({
		...state
	})),

	on(InfoShopActions.getInfoAccountSuccess, (state: InfoAccountState, action: any) => ({
		success: true,
		items: action,
		error: false
	})),

	on(InfoShopActions.getInfoAccountFailed, (state: InfoAccountState, action: any) => ({
		...state,
		success: false,
		error: action.error
	}))
)
