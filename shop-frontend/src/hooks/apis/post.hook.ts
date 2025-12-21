import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QueryPostDto } from '../../modules/post/interfaces'
import { IPaginationResponse, IQueryResponse } from '@core/interfaces'
import { ProductDetailModel } from '@models/post-detail.model'
import { PostBaseModel } from '@models/post-base.model'

export class ProductApiService {
	static ProductApi = createApi({
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
			getProduct: build.query<ProductDetailModel, number>({
				query: (postId: number) => `/post/${postId}`,
				transformResponse: (response: IQueryResponse<ProductDetailModel[]>) =>
					ProductDetailModel.fromJson(response.response)
			}),

			searchProduct: build.query<IPaginationResponse<PostBaseModel>, QueryPostDto>({
				query: (args: QueryPostDto) => {
					return {
						url: `post/search`,
						method: 'get',
						params: {
							limit: +args.limit,
							page: +args.page,
							name: args.name
						}
					}
				}
			})
		})
	})
}

export const ProductApi = ProductApiService.ProductApi
export const { useGetProductQuery, useSearchProductQuery } = ProductApi
