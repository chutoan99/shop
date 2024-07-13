import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TopProDuctsResponse } from '../interfaces'

export const TopProductApi = createApi({
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
		getTopProduct: build.query<TopProDuctsResponse, void>({
			query: () => 'topProduct?page=1&limit=100'
		})
	})
})
export const { useGetTopProductQuery } = TopProductApi
