import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommentModel } from '@models/comment.model'
import { IPaginationResponse } from '@core/interfaces'
import { SearchCommentDto } from '@modules/post/modules/comment/dto'

export class CommentApiService {
	static CommentApi = createApi({
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
			getComments: build.query<IPaginationResponse<CommentModel>, SearchCommentDto>({
				query: (args: SearchCommentDto) => {
					return {
						url: `post/comment`,
						method: 'get',
						params: {
							limit: +args.limit,
							page: +args.page,
							shop_id: +args.shop_id,
							item_id: +args.item_id
						}
					}
				}
			})
		})
	})
}
export const CommentApi = CommentApiService.CommentApi
export const { useGetCommentsQuery } = CommentApi
