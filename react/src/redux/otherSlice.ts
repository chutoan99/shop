import { createSlice } from '@reduxjs/toolkit'
type interfaceState = {
	is_popup_chat: boolean
	heart: boolean
}
const initialState: interfaceState = {
	is_popup_chat: false,
	heart: false
}
const otherSlice = createSlice({
	name: 'others',
	initialState: initialState,
	reducers: {
		updateHeartTrue: (state) => {
			state.heart = true
		},

		updateHeartFalse: (state) => {
			state.heart = false
		},

		ToggleIsChat: (state) => {
			state.is_popup_chat = !state.is_popup_chat
		}
	}
})

export const OtherActions = otherSlice.actions
export default otherSlice.reducer
