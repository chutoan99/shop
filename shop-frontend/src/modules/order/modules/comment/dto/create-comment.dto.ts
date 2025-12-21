export type CreateCommentDto = {
	item_id: number
	shop_id: number
	order_id: number
	comment: string
	images: File[] | []
	rating_star: number
	options: string
	model_name: string
}
