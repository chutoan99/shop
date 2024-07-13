import { createFeatureSelector, createSelector } from '@ngrx/store'
import { OrderState } from './order.reducer'

const featureOrder = createFeatureSelector<OrderState>('order') // tên mình đặt trong ngrx tools

// lấy  ra các giá trị lưu trong store có thể lấy tất cả,
// trong trường hợp này thì chỉ lấy item trong post

export const orderSelector = createSelector(featureOrder, (state) => state.items)
