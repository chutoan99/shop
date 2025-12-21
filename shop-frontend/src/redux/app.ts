import { Actions, configureStore, Store, ThunkAction } from '@reduxjs/toolkit'
//? REDUX TOOLKIT
import otherReducer from './otherSlice'
import cartReducer from './cart.slice'
import userReducer from './userSlice'
import buyCartReducer from './buy-cart.slice'
import { CartApi } from '@hooks/apis/cart.hook'
import { ShopApi } from '@hooks/apis/shop.hook'
import { RoomApi } from '@hooks/apis/room.hook'
import { UserApi } from '@hooks/apis/user.hook'
import { OrderApi } from '@hooks/apis/order.hook'
import { NotifyApi } from '@hooks/apis/notify.hook'
import { CommentApi } from '@hooks/apis/comment.hook'
import { ProductApi } from '@hooks/apis/post.hook'
import { ShopMallApi } from '@hooks/apis/shop-mall.hook'
import { FlashSaleApi } from '@hooks/apis/flash-sale.hook'
import { BatchListApi } from '@hooks/apis/batch-list.hook'
import { TopProductApi } from '@hooks/apis/top-product.hook'
import { CategoryTreeApi } from '@hooks/apis/category.hook'
import { HistorySearchApi } from '@hooks/apis/history-search.hook'
import { SuggestSearchApi } from '@hooks/apis/suggest-search.hook'
import { BannerApi } from '@hooks/apis/banner.hook'

//? REDUX TOOLKIT RTK

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
	[SuggestSearchApi.reducerPath]: SuggestSearchApi.reducer,
	[HistorySearchApi.reducerPath]: HistorySearchApi.reducer
}
export const store: Store = configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(
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
			HistorySearchApi.middleware,
			SuggestSearchApi.middleware
		)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
