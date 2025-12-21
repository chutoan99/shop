import { IQueryResponse } from '@core/interfaces'
import { HistorySearchModel } from '@models/history-search.model'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export class HistorySearchApiService {
	static HistorySearchApi = createApi({
		reducerPath: 'HistorySearch',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getHistorySearch: build.query<HistorySearchModel[], void>({
				query: () => 'post/history-search',
				transformResponse: (response: IQueryResponse<HistorySearchModel[]>) =>
					HistorySearchModel.fromJson(response.response)
			})
		})
	})
}

export const HistorySearchApi = HistorySearchApiService.HistorySearchApi
export const { useGetHistorySearchQuery } = HistorySearchApi
