import { Expose } from 'class-transformer'

export default class CommentDto {
	@Expose()
	page!: number

	@Expose()
	limit!: number
}
