import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { FlashSaleModel } from '@models/flash-sale.model'

export class FlashSaleApiService {
	static FlashSaleApi = createApi({
		reducerPath: 'FlashSale',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getFlashSale: build.query<FlashSaleModel[], void>({
				query: () => 'system/flash-sale',
				transformResponse: (response: IQueryResponse<FlashSaleModel[]>) =>
					FlashSaleModel.fromJson(response.response)
			})
		})
	})
}
export const FlashSaleApi = FlashSaleApiService.FlashSaleApi
export const { useGetFlashSaleQuery } = FlashSaleApi
