import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateCartDto, CartResponse, CreateCartResponse, DeleteCartResponse, UpdateCartResponse } from '../interfaces'

export const CartApi = createApi({
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
		getCarts: build.query<CartResponse, void>({
			query: () => 'cart'
		}),

		createCart: build.mutation<CreateCartResponse, CreateCartDto>({
			query: (body: CreateCartDto) => {
				return {
					url: 'cart',
					method: 'POST',
					body
				}
			}
		}),

		updateCart: build.mutation<UpdateCartResponse, any>({
			query: (args) => {
				const { cartid, body } = args
				return {
					url: `cart/${cartid}`,
					method: 'PUT',
					body
				}
			}
		}),

		deleteCart: build.mutation<DeleteCartResponse, any>({
			query: (cartid: string) => {
				return {
					url: `cart/${cartid}`,
					method: 'DELETE'
				}
			}
		})
	})
})

export const { useGetCartsQuery, useCreateCartMutation, useDeleteCartMutation, useUpdateCartMutation } = CartApi
