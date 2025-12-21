import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { BannerModel } from '@models/banner.model'

export class BannerApiService {
	static BannerApi = createApi({
		reducerPath: 'Banner',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getBanner: build.query<BannerModel[], void>({
				query: () => 'system/banner',
				transformResponse: (response: IQueryResponse<BannerModel[]>) => BannerModel.fromJson(response.response)
			})
		})
	})
}

export const BannerApi = BannerApiService.BannerApi
export const { useGetBannerQuery } = BannerApi
