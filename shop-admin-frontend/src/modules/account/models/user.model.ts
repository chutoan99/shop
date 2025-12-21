import { BaseModel } from '@core/model/base.model'
import { Expose } from 'class-transformer'

export class UserInfoModel extends BaseModel {
	@Expose()
	sex!: number

	@Expose()
	role!: string

	@Expose()
	userId!: string

	@Expose()
	shopId!: number

	@Expose()
	email!: string

	@Expose()
	name!: string

	@Expose()
	addressObj!: string

	@Expose()
	birthday!: string

	@Expose()
	phone!: number

	@Expose()
	avatar!: string

	@Expose()
	filename!: null

	@Expose()
	notNewUser!: false
}
