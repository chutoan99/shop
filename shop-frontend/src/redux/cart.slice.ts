import { createSlice } from '@reduxjs/toolkit'

type initial = {
	total: number
}
const initialState: initial = {
	total: 0
}
const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		updateTotalCart: (state, action) => {
			state.total = action.payload
		}
	}
})

export const CartActions = cartSlice.actions
export default cartSlice.reducer
