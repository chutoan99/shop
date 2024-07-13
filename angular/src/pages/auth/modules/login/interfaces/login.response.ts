import { Auth } from 'src/types/auth.model'
import { ShopInfor } from 'src/types/inforShop.model'

export interface AuthResponse {
	err: number
	msg: string
	response: Auth
	access_token: string
}
export interface ShopsResponse {
	err: number
	msg: string
	page: number
	limit: number
	totalPage: number
	response: [count: number, rows: ShopInfor[]]
}
