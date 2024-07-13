import { ActionType, createAction, props } from '@ngrx/store'

export const GET_INFOR_SHOP = '@InforShop/GetAllStart'
export const GET_INFOR_SHOP_SUCCESS = '@InforShop/GetAllSuccess'
export const GET_INFOR_SHOP_FAILED = '@InforShop/GetAllFailed'

export const getAllStart = createAction(GET_INFOR_SHOP)
export const getAllSuccess = createAction(GET_INFOR_SHOP_SUCCESS, props<any>())
export const getAllFailed = createAction(GET_INFOR_SHOP_FAILED, props<any>())

export type InforShopActions =
	| ActionType<typeof getAllStart>
	| ActionType<typeof getAllSuccess>
	| ActionType<typeof getAllFailed>
