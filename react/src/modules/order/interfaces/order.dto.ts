export type QueryOrderDto = {
	type: number | null
	shop_name: string
}

export type CreateOrderDto = {
	item_groups_id: string
	amount: string
	item_option: string
	final_total: number
	total_num_items: number
	note: string
	shopid: number
	shop_name: string
	tierVariation: string
}
