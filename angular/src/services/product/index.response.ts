import { Product } from 'src/types/product.model'

export interface ProductResponse {
	err: number
	msg: string
	page: number
	limit: number
	totalPage: number
	response: Response
}

export interface Response {
	count: number
	rows: Product[]
}
