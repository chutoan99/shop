import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PostIdResponse, QueryPostDto, PostResponse } from '../interfaces'

export const ProductApi = createApi({
	reducerPath: 'Products',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		getProduct: build.query<PostIdResponse, number>({
			query: (postId: number) => `/post/${postId}`
		}),

		searchProduct: build.query<PostResponse, QueryPostDto>({
			query: (args: QueryPostDto) => {
				return {
					url: `post/search`,
					method: 'get',
					params: {
						limit: args.limit,
						page: args.page,
						name: args.name
					}
				}
			}
		})
	})
})

export const { useGetProductQuery, useSearchProductQuery } = ProductApi
