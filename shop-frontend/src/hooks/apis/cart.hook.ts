import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICommandResponse, IQueryResponse } from '@core/interfaces'
import { CartModel } from '@models/cart.model'
import { CreateCartDto } from '@modules/cart/dto'

export class CartApiService {
	static CartApi = createApi({
		reducerPath: 'CartApi',
		tagTypes: ['Cart'],
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getCarts: build.query<IQueryResponse<[CartModel[]]>, void>({
				query: () => 'cart'
			}),

			createCart: build.mutation<ICommandResponse, CreateCartDto>({
				query: (body: CreateCartDto) => {
					return {
						url: 'cart',
						method: 'POST',
						body
					}
				}
			}),

			updateCart: build.mutation<ICommandResponse, any>({
				query: (args) => {
					const { cartid, body } = args
					return {
						url: `cart/${cartid}`,
						method: 'PUT',
						body
					}
				}
			}),

			deleteCart: build.mutation<ICommandResponse, any>({
				query: (cartid: string) => {
					return {
						url: `cart/${cartid}`,
						method: 'DELETE'
					}
				}
			})
		})
	})
}
export const CartApi = CartApiService.CartApi
export const { useGetCartsQuery, useCreateCartMutation, useDeleteCartMutation, useUpdateCartMutation } = CartApi
