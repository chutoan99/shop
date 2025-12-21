import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IQueryResponse } from '@core/interfaces'
import { RoomExtra } from '@models/room.model'

export class RoomApiService {
	static RoomApi = createApi({
		reducerPath: 'Room',
		baseQuery: fetchBaseQuery({
			baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}/`,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json')
				headers.set('Authorization', `Bearer ${localStorage.getItem('token-shopee')}`)
				return headers
			}
		}),
		endpoints: (build) => ({
			getRooms: build.query<RoomExtra[], void>({
				query: () => {
					return {
						url: `room`,
						method: 'get',
						params: {
							type: 'client'
						}
					}
				},
				transformResponse: (response: IQueryResponse<RoomExtra[]>) => RoomExtra.fromJson(response.response)
			}),

			getMessRoom: build.query<any, number | undefined>({
				query: (roomid) => (roomid ? `room/${roomid}/mess` : '')
			}),

			createRoom: build.mutation<any, any>({
				query: (body) => {
					return {
						url: 'room',
						method: 'POST',
						body
					}
				}
			}),

			deleteRoom: build.mutation<any, any>({
				query: (roomid) => {
					return {
						url: `room/:${roomid}`,
						method: 'DELETE'
					}
				}
			})
		})
	})
}

export const RoomApi = RoomApiService.RoomApi
export const { useGetRoomsQuery, useGetMessRoomQuery, useCreateRoomMutation, useDeleteRoomMutation } = RoomApi
