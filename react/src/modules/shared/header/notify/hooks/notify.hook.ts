import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { NotifyResponse } from '../interfaces'

export const NotifyApi = createApi({
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
		getNotify: build.query<NotifyResponse, void>({
			query: () => 'notify'
		})
	})
})
export const { useGetNotifyQuery } = NotifyApi
