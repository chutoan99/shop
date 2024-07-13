import { createReducer, on } from '@ngrx/store'
import * as ProductActions from './product.actions'
import { Product } from '../../types/product.model'

export interface ProductState {
	items: Product[]
	success: boolean
	error: boolean | string
}

const initialState: ProductState = {
	items: [],
	success: false,
	error: false
}

export const productReducer = createReducer(
	initialState,

	// get start
	on(ProductActions.getAllProduct, (state: ProductState) => ({
		...state
	})),

	// get Success
	on(ProductActions.getAllSuccess, (state: ProductState, action: any) => ({
		success: true,
		items: action,
		error: false
	})),

	// get Failed
	on(ProductActions.getAllFailed, (state: ProductState, action: any) => ({
		...state,
		success: false,
		error: action.error
	}))
)
