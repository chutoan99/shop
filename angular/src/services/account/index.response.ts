import { ShopAccount } from 'src/types/account.model'

export interface AccountResponse {
	err: number
	msg: string
	response: ShopAccount
}
