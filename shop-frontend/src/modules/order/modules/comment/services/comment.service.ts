import toast from 'react-hot-toast'
import FormData from 'form-data'
import instance from '@configs/axios.config'
import { CreateCommentDto } from '../dto'

export const CreateComment = async (payload: CreateCommentDto) => {
	try {
		const token = localStorage.getItem('token-shopee')
		let data: FormData = new FormData()
		data.append('order_id', payload.order_id)
		data.append('item_id', payload.item_id)
		data.append('shop_d', payload.shop_id)
		data.append('comment', payload.comment)
		data.append('model_name', payload.model_name)
		data.append('options', payload.options)
		data.append('rating_star', payload.rating_star)
		for (const img of payload?.images) {
			if (img instanceof File) {
				data.append('images', img)
			}
		}

		const response = await instance({
			method: 'post',
			url: 'order/comment',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: data
		})
		console.log(response, 'response')
		if (response?.status === 200) {
			return response.data
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}
