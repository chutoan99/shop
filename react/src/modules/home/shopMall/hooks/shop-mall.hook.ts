import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ShopMallResponse } from '../interfaces'

export const ShopMallApi = createApi({
	reducerPath: 'ShopMall',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getShopMall: build.query<ShopMallResponse, void>({
			query: () => 'shopMall'
		})
	})
})
export const { useGetShopMallQuery } = ShopMallApi
