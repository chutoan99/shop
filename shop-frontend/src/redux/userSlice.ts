import { IUserModel } from '@models/user.model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { isLogin: boolean; data: Partial<IUserModel> } = {
	isLogin: false,
	data: {
		id: 0,
		shop_id: 0,
		username: '',
		email: '',
		sex: 0,
		role: '',
		name: '',
		address_obj: null,
		phone: 0,
		avatar: '',
		filename: '',
		not_new_user: false,
		is_verified: false
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<any>) => {
			const {
				id,
				shop_id,
				sex,
				role,
				email,
				name,
				address_obj,
				avatar,
				not_new_user,
				birthday,
				phone,
				filename
			} = action.payload.data as IUserModel

			const isLogin = action.payload.isLogin
			state.data.id = id
			state.data.shop_id = shop_id
			state.data.sex = sex
			state.data.role = role
			state.data.email = email
			state.data.name = name
			state.data.address_obj = address_obj
			state.data.avatar = avatar
			state.data.filename = filename
			state.data.birthday = birthday
			state.data.not_new_user = not_new_user
			state.data.phone = phone
			state.isLogin = isLogin
		}
	}
})

export const UserActions = userSlice.actions
export default userSlice.reducer
