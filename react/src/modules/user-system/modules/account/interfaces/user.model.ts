import { BaseModel } from '../../../../../@core/interfaces'

export interface UserModel extends BaseModel {
	id: number
	shopid: number
	username: string
	email: string
	sex: number
	role: string
	name: string
	address?: string
	birthday?: string
	phone?: number
	avatar?: string
	filename?: null | string
	not_new_user: number
}
