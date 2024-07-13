export type CreateCartDto = {
	itemid: number
	shopid: number
	amount: number
	item_option: string
	tierVariation: string
}

export type UpdateCartDto = {
	amount: number
	item_option: string
}
