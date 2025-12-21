import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { NotifyModel } from '@models/notify.model'

export class NotifyApiService {
	static NotifyApi = createApi({
		reducerPath: 'Notify',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getNotify: build.query<NotifyModel[], void>({
				query: () => 'notify',
				transformResponse: (response: IQueryResponse<NotifyModel[]>) => NotifyModel.fromJson(response.response)
			})
		})
	})
}
export const NotifyApi = NotifyApiService.NotifyApi
export const { useGetNotifyQuery } = NotifyApi
