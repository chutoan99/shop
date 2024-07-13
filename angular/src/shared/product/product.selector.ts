import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductState } from './product.reducer'

const featureProduct = createFeatureSelector<ProductState>('product') // tên mình đặt trong ngrx tools

// lấy  ra các giá trị lưu trong store có thể lấy tất cả,
// trong trường hợp này thì chỉ lấy item trong post

export const productSelector = createSelector(featureProduct, (state) => {
	return state.items
})
