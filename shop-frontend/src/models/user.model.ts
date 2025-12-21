import { Expose, Type } from 'class-transformer'
import { BaseModel, IBaseModel } from '@core/interfaces'

export class AddressObj {
	@Expose()
	districtCode?: number | null

	@Expose()
	provinceCode?: number | null

	@Expose()
	wardCode?: number | null

	@Expose()
	address?: string
}

export interface IUserModel extends IBaseModel {
	id: number
	shop_id: number
	username: string
	email: string
	sex: number
	role: string
	name: string
	address_obj?: AddressObj | null
	birthday?: Date | null
	phone?: number
	avatar?: string
	filename?: null | string
	not_new_user: boolean
	is_verified: boolean

	created_at: Date
	updated_at: Date | null
}

export class UserModel extends BaseModel implements IUserModel {
	@Expose()
	id!: number

	@Expose()
	shop_id!: number

	@Expose()
	username!: string

	@Expose()
	email!: string

	@Expose()
	sex!: number

	@Expose()
	role!: string

	@Expose()
	name!: string

	@Expose()
	@Type(() => AddressObj)
	address_obj?: AddressObj | null

	@Expose()
	@Type(() => Date)
	birthday?: Date | null

	@Expose()
	phone?: number

	@Expose()
	avatar?: string

	@Expose()
	filename?: null | string

	@Expose()
	not_new_user!: boolean

	@Expose()
	is_verified!: boolean

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
