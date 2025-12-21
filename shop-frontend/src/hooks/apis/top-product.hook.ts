import { IQueryResponse } from '@core/interfaces'
import { TopProductModel } from '@models/top-product.model'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export class TopProductApiService {
	static TopProductApi = createApi({
		reducerPath: 'TopProduct',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getTopProduct: build.query<TopProductModel[], void>({
				query: () => 'post/top-product?page=1&limit=100',
				transformResponse: (response: IQueryResponse<TopProductModel[]>) =>
					TopProductModel.fromJson(response.response)
			})
		})
	})
}

export const TopProductApi = TopProductApiService.TopProductApi
export const { useGetTopProductQuery } = TopProductApi
