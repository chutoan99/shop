import { toast } from 'react-hot-toast'
import config from '@configs/axios.config'

export const GetLikes = async () => {
	const token = localStorage.getItem('token-shopee')
	try {
		const response = await config({
			method: 'get',
			url: `/like`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		if (response.status === 200) {
			return response.data
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}

export const CreateLike = async (payload: any) => {
	try {
		const data = {
			item_id: payload.item_id,
			shop_id: payload.shop_id
		}
		const token = localStorage.getItem('token-shopee')
		const response = await config({
			method: 'post',
			url: `/like`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: JSON.stringify({
				data
			})
		})
		if (response.status === 200) {
			return response.data
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}

export const DeleteLike = async (itemId: any) => {
	try {
		const token = localStorage.getItem('token-shopee')
		const response = await config({
			method: 'delete',
			url: `/like/:${itemId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		if (response.status === 200) {
			return response.data
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}
