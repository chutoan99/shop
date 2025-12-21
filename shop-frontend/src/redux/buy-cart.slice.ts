import { CartModel } from '@models/cart.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type BuyCartState = {
	success: boolean
	data: [CartModel[]]
	error: boolean
}
const initialState: BuyCartState = {
	success: false,
	data: [[]],
	error: false
}
const buyCartStateSlice = createSlice({
	name: 'buyCartState',
	initialState: initialState,
	reducers: {
		addBuyCart: (state, action: PayloadAction<CartModel[]>) => {
			let shopIdArrays = action.payload.reduce((acc: any, curr: CartModel) => {
				const shopId = curr.shop_id
				if (acc[shopId]) {
					acc[shopId].push(curr)
				} else {
					acc[shopId] = [curr]
				}
				return acc
			}, {})
			shopIdArrays = Object.values(shopIdArrays)
			state.success = true
			state.data = shopIdArrays
		}
	}
})

export const buyCartActions = buyCartStateSlice.actions
export default buyCartStateSlice.reducer
