import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { BatchListModel } from '@models/batch-list.model'

export class BatchListApiService {
	static BatchListApi = createApi({
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
			getBatchList: build.query<BatchListModel[], void>({
				query: () => 'system/batch-list',
				transformResponse: (response: IQueryResponse<BatchListModel[]>) =>
					BatchListModel.fromJson(response.response)
			})
		})
	})
}

export const BatchListApi = BatchListApiService.BatchListApi
export const { useGetBatchListQuery } = BatchListApi
