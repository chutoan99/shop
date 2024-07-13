import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SearchHistoryResponse } from '../interfaces/search-history.response'

export const SearchHistoryApi = createApi({
	reducerPath: 'SearchHistory',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getHistorySearch: build.query<SearchHistoryResponse, void>({
			query: () => 'searchHistory'
		}),
		createHistorySearch: build.mutation<SearchHistoryResponse, any>({
			query: (body) => {
				return {
					url: 'searchHistory',
					method: 'POST',
					body
				}
			}
		})
	})
})
export const { useGetHistorySearchQuery, useCreateHistorySearchMutation } = SearchHistoryApi
