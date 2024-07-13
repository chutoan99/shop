import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserResponse } from '../interfaces'

//? fetch data RTK QUERY

export const UserApi = createApi({
	reducerPath: 'User',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getUserCurrent: build.query<UserResponse, void>({
			query: () => 'user/current'
		})
	})
})
export const { useGetUserCurrentQuery } = UserApi
