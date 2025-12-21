import { ROLE } from '@core/enums'
import { AddressObj } from '@core/model'
import { Expose, plainToInstance, Transform } from 'class-transformer'
import bcrypt from 'bcrypt'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertUserDto extends InsertBaseDto {
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
	@Transform(({ value }) => (value ? JSON.stringify(value) : null))
	address_obj!: AddressObj

	@Expose()
	birthday!: Date

	@Expose()
	phone!: number

	@Expose()
	filename!: string

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	not_new_user!: boolean

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
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

	static fromJson(jsonData: any): InsertUserDto {
		const sex = 0

		const img_men =
			'https://imgs.search.brave.com/NMbKJRcDath4I02VHl0t8tYf4UJSAmftuegWj3ZCbYs/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTcuanBn'

		const img_women =
			'https://imgs.search.brave.com/GgQ8DyHg0f1QxTAoZOmh4fYbylAOXHK903G1j_P_EaE/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTQuanBn'

		const hashPassword: string = bcrypt.hashSync(
			`${jsonData?.data?.account?.username}${jsonData?.data?.userid}`,
			bcrypt.genSaltSync(12)
		)

		return plainToInstance(InsertUserDto, {
			id: jsonData?.data?.userid,
			shop_id: jsonData?.data?.shopid,
			name: jsonData?.data?.name,
			username: jsonData?.data?.account?.username,
			email: `admin${jsonData?.data?.userid}@yopmail.com`,
			sex,
			role: ROLE.ADMIN,
			password: hashPassword,
			avatar: sex === 0 ? img_men : img_women,
			address_obj: Object.assign(new AddressObj(), {
				provinceCode: null,
				wardCode: null,
				districtCode: null,
				address: jsonData?.data?.shop_location
			}),
			phone: 0
		})
	}
}
