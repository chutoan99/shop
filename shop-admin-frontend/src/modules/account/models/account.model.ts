import { BaseModel } from '@core/model/base.model'
import { Expose, Transform } from 'class-transformer'

export class AccountInfoModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	shopId!: number

	@Expose()
	userId!: number

	@Expose()
	isOfficialShop!: boolean

	@Expose()
	itemCount!: number

	@Expose()
	ratingStar!: number

	@Expose()
	name!: string

	@Expose()
	cover!: string

	@Expose()
	followerCount!: number

	@Expose()
	ratingBad!: number

	@Expose()
	ratingGood!: number

	@Expose()
	ratingNormal!: number

	@Expose()
	status!: number

	@Expose()
	shopLocation!: string

	@Expose()
	username!: string

	@Expose()
	portrait!: string

	@Expose()
	responseTime!: number

	@Expose()
	description!: string

	@Expose()
	followed!: boolean

	@Expose()
	ctime!: Date

	@Expose()
	mtime!: Date

	@Expose()
	responseRate!: number

	@Expose()
	country!: string

	@Expose()
	lastActiveTime!: number

	@Expose()
	createdAt!: Date

	@Expose()
	updatedAt!: Date
}
