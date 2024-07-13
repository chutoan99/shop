import { configureStore, ThunkAction, Action, Store, Reducer } from '@reduxjs/toolkit'
//? REDUX TOOLKIT
import otherReducer from './otherSlice'
import cartReducer from './cart.slice'
import userReducer from './userSlice'
import buyCartReducer from './buyCart.slice'
//? REDUX TOOLKIT RTK
import { CartApi } from '../modules/cart/hooks'
import { ShopApi } from '../modules/shop/hooks'
import { OrderApi } from '../modules/order/hooks'
import { ProductApi } from '../modules/post/hooks'
import { CommentApi } from '../modules/comment/hooks'
import { RoomApi } from '../modules/shared/chat/hooks'
import { BannerApi } from '../modules/home/banner/hooks'
import { ShopMallApi } from '../modules/home/shopMall/hooks'
import { FlashSaleApi } from '../modules/home/flashSale/hooks'
import { BatchListApi } from '../modules/home/batchList/hooks'
import { TopProductApi } from '../modules/home/topProduct/hooks'
import { CategoryTreeApi } from '../modules/home/category/hooks'
import { NotifyApi } from '../modules/shared/header/notify/hooks'
import { SearchSuggestApi } from '../modules/shared/header/searchSuggest/hooks'
import { SearchHistoryApi } from '../modules/shared/header/searchHistory/hooks'
import { UserApi } from '../modules/user-system/modules/account/hooks'

const RootReducer: any = {
	others: otherReducer,
	cart: cartReducer,
	user: userReducer,
	buyCart: buyCartReducer,
	[CartApi.reducerPath]: CartApi.reducer,
	[ShopApi.reducerPath]: ShopApi.reducer,
	[RoomApi.reducerPath]: RoomApi.reducer,
	[UserApi.reducerPath]: UserApi.reducer,
	[OrderApi.reducerPath]: OrderApi.reducer,
	[NotifyApi.reducerPath]: NotifyApi.reducer,
	[BannerApi.reducerPath]: BannerApi.reducer,
	[CommentApi.reducerPath]: CommentApi.reducer,
	[ProductApi.reducerPath]: ProductApi.reducer,
	[ShopMallApi.reducerPath]: ShopMallApi.reducer,
	[FlashSaleApi.reducerPath]: FlashSaleApi.reducer,
	[BatchListApi.reducerPath]: BatchListApi.reducer,
	[TopProductApi.reducerPath]: TopProductApi.reducer,
	[CategoryTreeApi.reducerPath]: CategoryTreeApi.reducer,
	[SearchSuggestApi.reducerPath]: SearchSuggestApi.reducer,
	[SearchHistoryApi.reducerPath]: SearchHistoryApi.reducer
}
export const store: Store = configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			CartApi.middleware,
			ShopApi.middleware,
			RoomApi.middleware,
			UserApi.middleware,
			OrderApi.middleware,
			NotifyApi.middleware,
			BannerApi.middleware,
			CommentApi.middleware,
			ProductApi.middleware,
			ShopMallApi.middleware,
			BatchListApi.middleware,
			BatchListApi.middleware,
			FlashSaleApi.middleware,
			TopProductApi.middleware,
			CategoryTreeApi.middleware,
			SearchHistoryApi.middleware,
			SearchSuggestApi.middleware
		)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
