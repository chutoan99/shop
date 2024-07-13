import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BatchListResponse } from '../interfaces'

export const BatchListApi = createApi({
	reducerPath: 'BatchList',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getBatchList: build.query<BatchListResponse, void>({
			query: () => 'batchList'
		})
	})
})
export const { useGetBatchListQuery } = BatchListApi
