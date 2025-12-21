import { Exclude, Expose, Transform, Type } from 'class-transformer'
export default class AccountDto {
	@Expose()
	page: number = 0

	@Expose()
	limit: number = 10

	@Expose()
	@Transform(({ value }) => (value?.trim() ? value : undefined), { toPlainOnly: true })
	key?: string
}
