import { Expose } from 'class-transformer'
import { IsISO8601 } from 'class-validator'

export class BaseModel {
	@Expose()
	metadata?: object

	@Expose()
	is_active!: boolean

	@Expose()
	created_at!: Date

	@Expose()
	created_by?: number

	@Expose()
	deleted_at?: Date | null

	@Expose()
	deleted_by?: number

	@Expose()
	updated_at?: Date | null

	@Expose()
	updated_by?: number
}
