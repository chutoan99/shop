import { ICustomResponse, IQueryResponse } from '@core/interfaces'
import { UserModel } from '@models/user.model'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface UserResponse extends ICustomResponse {
	access_token: string
	response: UserModel
}

export class UserApiService {
	static UserApi = createApi({
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
			getUserCurrent: build.query<UserModel, void>({
				query: () => 'user/current',
				transformResponse: (response: IQueryResponse<UserModel>) => UserModel.fromJson(response.response)
			})
		})
	})
}
export const UserApi = UserApiService.UserApi
export const { useGetUserCurrentQuery } = UserApi
