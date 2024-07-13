import { ActionType, createAction, props } from '@ngrx/store'
import { Product } from '../../types/product.model'

export const GET_PRODUCTS = '@Product/GetAll'
export const GET_PRODUCTS_SUCCESS = '@Product/GetAllSuccess'
export const GET_PRODUCTS_FAILED = '@Product/GetAllFailed'

export const getAllProduct = createAction(GET_PRODUCTS)
export const getAllSuccess = createAction(GET_PRODUCTS_SUCCESS, props<{ products: Product[] }>())
export const getAllFailed = createAction(GET_PRODUCTS_FAILED, props<{ error?: string }>())

export type ProductActions =
	| ActionType<typeof getAllProduct>
	| ActionType<typeof getAllSuccess>
	| ActionType<typeof getAllFailed>
