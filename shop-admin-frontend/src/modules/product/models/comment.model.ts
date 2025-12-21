import { BaseModel } from '@core/model'
import { Expose } from 'class-transformer'

export class CommentModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	parentCmtId!: null

	@Expose()
	userId!: number

	@Expose()
	shopId!: number

	@Expose()
	orderId!: number

	@Expose()
	itemId!: number

	@Expose()
	level!: number

	@Expose()
	isShop!: boolean

	@Expose()
	rating!: number

	@Expose()
	comment!: string

	@Expose()
	ratingStar!: number

	@Expose()
	status!: number

	@Expose()
	authorUsername!: string

	@Expose()
	authorPortrait!: null

	@Expose()
	images!: string

	@Expose()
	cover!: string

	@Expose()
	videos!: string

	@Expose()
	tierVariation!: string

	@Expose()
	listOption!: string

	@Expose()
	isReplied!: boolean

	@Expose()
	likeCount!: number

	@Expose()
	liked!: boolean

	@Expose()
	isActive!: boolean

	@Expose()
	createdAt!: Date

	@Expose()
	updatedAt!: Date

	@Expose()
	deleteAt!: null
}
