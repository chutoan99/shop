import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { PostBaseModel } from '@models/post-base.model'
import { ShopModel } from '@models/shop.model'

export class ShopApiService {
	static ShopApi = createApi({
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
			getShopId: build.query<ShopModel, number>({
				query: (shopId: number) => `/shop/${shopId}`,
				transformResponse: (response: IQueryResponse<ShopModel[]>) => ShopModel.fromJson(response.response)
			}),

			getItemsShop: build.query<PostBaseModel[], number>({
				query: (shopId: number) => `/shop/${shopId}/posts`,
				transformResponse: (response: IQueryResponse<PostBaseModel[]>) =>
					PostBaseModel.fromJson(response.response)
			})
		})
	})
}

export const ShopApi = ShopApiService.ShopApi
export const { useGetShopIdQuery, useGetItemsShopQuery } = ShopApi
