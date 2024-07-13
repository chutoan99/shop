import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BannerResponse } from '../interfaces'

export const BannerApi = createApi({
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
		getBanner: build.query<BannerResponse, void>({
			query: () => 'banner'
		})
	})
})
export const { useGetBannerQuery } = BannerApi
