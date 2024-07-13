import { createFeatureSelector, createSelector } from '@ngrx/store'
import { InforShopState } from './inforShop.reducer'

const featureAuth = createFeatureSelector<InforShopState>('inforShop') // tên mình đặt trong ngrx tools

// lấy  ra các giá trị lưu trong store có thể lấy tất cả,
// trong trường hợp này thì chỉ lấy item trong inforShop

export const shopidSelector = createSelector(featureAuth, (state) => {
	return state.items.shopid
})
