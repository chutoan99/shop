import { VariationCartModel } from '@models/cart.model'

export type UpdateCartDto = {
	amount: number
	variation: [VariationCartModel] | []
}
