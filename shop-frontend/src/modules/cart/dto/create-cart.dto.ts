import { VariationCartModel } from '@models/cart.model'

export type CreateCartDto = {
	item_id: number
	shop_id: number
	amount: number
	variation: [VariationCartModel] | []
}
