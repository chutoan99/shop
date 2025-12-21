import toast from 'react-hot-toast'
import FormData from 'form-data'
import instance from '@configs/axios.config'
import { IUserModel, UserModel } from '@models/user.model'

export interface UploadImageResponse {
	fieldname: string
	originalname: string
	encoding: string
	mimetype: string
	path: string
	size: number
	filename: string
}

export const GetCurrentUser = async () => {
	try {
		const token = localStorage.getItem('token-shopee')
		const response = await instance({
			method: 'get',
			url: 'user/current',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		if (response?.status === 200) {
			return response.data
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}

export const UpdateUser = async (payload: IUserModel) => {
	try {
		const token = localStorage.getItem('token-shopee')
		let data = new FormData()
		const birthday = new Date(payload.birthday!)
		birthday.setHours(birthday.getHours() + 7) // Thêm 7 giờ cho múi giờ việt nam
		data.append('sex', +payload.sex)
		data.append('email', payload.email)
		data.append('name', payload.name)
		data.append('address_obj', JSON.stringify(payload.address_obj))
		data.append('birthday', birthday.toISOString())
		data.append('phone', +payload.phone!)
		data.append('avatar', payload.avatar)
		data.append('filename', payload.filename)
		const response = await instance({
			method: 'put',
			url: 'user',
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: data
		})

		if (response?.status === 200) {
			return response.data
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}

export const UploadImages = async (file: any): Promise<UploadImageResponse | undefined> => {
	try {
		const token = localStorage.getItem('token-shopee')
		let data = new FormData()
		data.append('images', file)
		const response = await instance({
			method: 'post',
			url: 'upload/images',
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: data
		})

		if (response?.status === 200) {
			return response.data as UploadImageResponse
		}
	} catch (error: any) {
		toast.error(error.msg)
	}
}
