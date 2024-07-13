import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateOrderDto, CreateOrdersResponse, OrderResponse, OrdersResponse, QueryOrderDto } from '../interfaces'

export const OrderApi = createApi({
	reducerPath: 'Order',
	baseQuery: fetchBaseQuery({
		baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json')
			headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		searchOrders: build.query<OrdersResponse, QueryOrderDto>({
			query: (args: QueryOrderDto) => {
				return {
					url: `/order/search`,
					method: 'get',
					params: {
						shop_name: args.shop_name,
						type: args.type
					}
				}
			}
		}),

		getOrder: build.query<OrderResponse, number>({
			query: (orderid: number) => `order/${orderid}`
		}),

		createOrder: build.mutation<CreateOrdersResponse, CreateOrderDto[]>({
			query: (body: CreateOrderDto[]) => {
				return {
					url: 'order',
					method: 'POST',
					body
				}
			}
		})
	})
})
export const { useCreateOrderMutation, useGetOrderQuery, useSearchOrdersQuery } = OrderApi
