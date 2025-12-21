import { BaseModel } from '@core/interfaces'
import { AddressObj } from '@core/model'
import { Expose, Transform } from 'class-transformer'

export class UserModel extends BaseModel {
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
	password!: string

	@Expose()
	name!: string

	@Expose()
	@Transform(({ value }) =>
		value ? (typeof value === 'string' ? JSON.parse(value) : value) : {}
	)
	address_obj!: AddressObj

	@Expose()
	birthday!: Date

	@Expose()
	phone!: number

	@Expose()
	filename!: string

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	not_new_user!: boolean

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_verified!: boolean

	@Expose()
	refresh_token!: string

	@Expose()
	password_reset_token!: string

	@Expose()
	password_reset_expires!: string

	@Expose()
	password_changed_at!: string

	@Expose()
	avatar!: string
}
