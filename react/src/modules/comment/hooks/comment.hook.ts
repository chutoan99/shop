import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommentsResponse } from '../interfaces'

export const CommentApi = createApi({
	reducerPath: 'Comment',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getComments: build.query<CommentsResponse, any>({
			query: (params: any) => `comment?shopid=${params.shopid}&itemid=${params.itemid}`
		})
	})
})
export const { useGetCommentsQuery } = CommentApi
