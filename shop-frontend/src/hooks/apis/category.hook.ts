import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { CategoryTreeModel } from '@models/category.model'
import { PostBaseModel } from '@models/post-base.model'
import { QueryCategoryDto } from '@modules/home/category/interfaces'

export class CategoryTreeApiService {
	static CategoryTreeApi = createApi({
		reducerPath: 'CategoryTree',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getCategoryTree: build.query<CategoryTreeModel[][], void>({
				query: () => '/industry/category-tree?level=1',
				transformResponse: (response: IQueryResponse<CategoryTreeModel[][]>) =>
					CategoryTreeModel.fromJson(response.response)
			}),
			getCategoryTreeParent: build.query<CategoryTreeModel[], number>({
				query: (cat_id: number) => `/industry/category-tree?parent_cat_id=${cat_id}`,
				transformResponse: (response: IQueryResponse<CategoryTreeModel[]>) =>
					CategoryTreeModel.fromJson(response.response)
			}),

			searchCategories: build.query<PostBaseModel[], QueryCategoryDto>({
				query: (payload: QueryCategoryDto) => {
					return `/industry/category?page=${payload.page}&limit=${payload.limit}&category_name=${payload.category_name}`
				},
				transformResponse: (response: IQueryResponse<PostBaseModel[]>) =>
					PostBaseModel.fromJson(response.response)
			})
		})
	})
}

export const CategoryTreeApi = CategoryTreeApiService.CategoryTreeApi
export const { useGetCategoryTreeQuery, useGetCategoryTreeParentQuery, useSearchCategoriesQuery } = CategoryTreeApi
