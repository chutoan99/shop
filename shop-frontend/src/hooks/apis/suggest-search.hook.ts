import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { SuggestSearchModel } from '@models/suggest-search.model'

export class SuggestSearchApiService {
	static SuggestSearchApi = createApi({
		reducerPath: 'SuggestSearch',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getSuggestSearch: build.query<SuggestSearchModel[], void>({
				query: () => 'system/suggest-search',
				transformResponse: (response: IQueryResponse<SuggestSearchModel[]>) =>
					SuggestSearchModel.fromJson(response.response)
			})
		})
	})
}

export const SuggestSearchApi = SuggestSearchApiService.SuggestSearchApi
export const { useGetSuggestSearchQuery } = SuggestSearchApi
