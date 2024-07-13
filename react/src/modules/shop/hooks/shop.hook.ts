import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ItemsShopResponse, ShopIdResponse } from '../interfaces'

export const ShopApi = createApi({
	reducerPath: 'Shop',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getShopId: build.query<ShopIdResponse, number>({
			query: (shopId: number) => `/shop/${shopId}`
		}),

		getItemsShop: build.query<ItemsShopResponse, number>({
			query: (shopId: number) => `/shop/${shopId}/posts`
		})
	})
})
export const { useGetShopIdQuery, useGetItemsShopQuery } = ShopApi
