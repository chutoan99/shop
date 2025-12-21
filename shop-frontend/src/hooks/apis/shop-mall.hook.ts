import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { ShopMallModel } from '@models/shop-mall.model'

export class ShopMallApiService {
	static ShopMallApi = createApi({
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
			getShopMall: build.query<ShopMallModel[][], void>({
				query: () => 'shop/mall',
				transformResponse: (response: IQueryResponse<ShopMallModel[][]>) =>
					ShopMallModel.fromJson(response.response)
			})
		})
	})
}

export const ShopMallApi = ShopMallApiService.ShopMallApi
export const { useGetShopMallQuery } = ShopMallApi
