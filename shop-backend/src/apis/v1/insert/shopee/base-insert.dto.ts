import { Expose, Transform } from 'class-transformer'
import { IsISO8601 } from 'class-validator'

export class InsertBaseDto {
	@Expose()
	metadata?: object

	@Expose()
	@Transform(({ value }) => (value ? 1 : 0))
	is_active!: boolean

	@Expose()
	@IsISO8601()
	created_at!: Date

	@Expose()
	created_by?: number

	@Expose()
	@IsISO8601()
	deleted_at?: Date | null

	@Expose()
	deleted_by?: number

	@Expose()
	@IsISO8601()
	updated_at?: Date | null

	@Expose()
	updated_by?: number
}
