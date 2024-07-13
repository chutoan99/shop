import { toast } from 'react-hot-toast'
import config from '../../../../configs/configAxios'

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
			itemid: payload.itemid,
			shopid: payload.shopid
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

export const DeleteLike = async (itemid: any) => {
	try {
		const token = localStorage.getItem('token-shopee')
		const response = await config({
			method: 'delete',
			url: `/like/:${itemid}`,
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
