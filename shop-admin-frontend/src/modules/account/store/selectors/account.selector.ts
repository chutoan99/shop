import { createFeatureSelector, createSelector } from '@ngrx/store'
import { InfoAccountState } from '../reducers'

const featureAuth = createFeatureSelector<InfoAccountState>('infoAccount') // tên mình đặt trong ngrx tools

// lấy  ra các giá trị lưu trong store có thể lấy tất cả,
// trong trường hợp này thì chỉ lấy item trong infoShop

export const InfoAccountSelector = createSelector(featureAuth, (state: InfoAccountState) => {
	return state.items
})
