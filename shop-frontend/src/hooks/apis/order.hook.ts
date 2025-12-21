import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseResponse, ICommandResponse, ICustomResponse } from '@core/interfaces'
import { ITabsModel, OrderModel } from '@models/order.model'
import { CreateOrderDto, QueryOrderDto } from '@modules/order/interfaces'

export interface OrdersResponse extends ICustomResponse {
	response: OrderModel[]
	tab: ITabsModel
}

export class OrderApiService {
	static OrderApi = createApi({
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

			getOrder: build.query<BaseResponse<OrderModel>, number>({
				query: (orderId: number) => `order/${orderId}`
			}),

			createOrder: build.mutation<ICommandResponse, CreateOrderDto>({
				query: (body: CreateOrderDto) => {
					return {
						url: 'order',
						method: 'POST',
						body
					}
				}
			})
		})
	})
}

export const OrderApi = OrderApiService.OrderApi
export const { useCreateOrderMutation, useGetOrderQuery, useSearchOrdersQuery } = OrderApi
