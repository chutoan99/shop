import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserModel } from '../modules/user-system/modules/account/interfaces'

const initialState: { isLogin: boolean; data: UserModel } = {
	isLogin: false,
	data: {
		id: 0,
		shopid: 0,
		username: '',
		email: '',
		sex: 0,
		role: '',
		name: '',
		address: '',
		birthday: '',
		phone: 0,
		avatar: '',
		filename: '',
		not_new_user: 0,
		createdAt: '',
		updatedAt: ''
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<any>) => {
			const { id, shopid, sex, role, email, name, address, avatar, not_new_user, birthday, phone, filename } =
				action.payload.data

			const isLogin = action.payload.isLogin
			state.data.id = id
			state.data.shopid = shopid
			state.data.sex = sex
			state.data.role = role
			state.data.email = email
			state.data.name = name
			state.data.address = address
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
