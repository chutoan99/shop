import { BaseModel } from '@core/interfaces'
import { Expose, Transform } from 'class-transformer'

export class CommentModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	parent_cmt_id!: number | null

	@Expose()
	user_id!: number

	@Expose()
	shop_id!: number

	@Expose()
	order_id!: number

	@Expose()
	item_id!: number

	@Expose()
	level!: number

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_shop!: boolean

	@Expose()
	rating: number | null | undefined

	@Expose()
	comment!: string

	@Expose()
	rating_star!: number

	@Expose()
	status!: number

	@Expose()
	author_username!: string

	@Expose()
	author_portrait?: string | null

	@Expose()
	@Transform(({ value }) =>
		typeof value === 'string' ? value.split(',') : value
	)
	images: string[] | null | undefined

	@Expose()
	cover?: string | null | undefined

	@Expose()
	videos?: string | null | undefined

	@Expose()
	tier_variation?: string | null | undefined

	@Expose()
	list_option?: string | null | undefined

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	is_replied!: boolean

	@Expose()
	like_count: number | null | undefined

	@Expose()
	@Transform(({ value }) => value === 'true' || value === true || value === 1)
	liked: boolean | null | undefined
}

export class TreeCommentModel extends CommentModel {
	@Expose()
	@Transform(({ value }) =>
		typeof value === 'string' ? JSON.parse(value) : value
	)
	reps: CommentModel[] = []
}
