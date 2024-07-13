export type CreateCommentDto = {
	itemid: number
	shopid: number
	orderid: number
	comment: string
	images: File[] | []
	rating_star: number
	options: string
	model_name: string
}
