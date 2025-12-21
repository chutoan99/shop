import { BaseModel } from '@core/model'
import { Expose } from 'class-transformer'

export class MessModel extends BaseModel {
	@Expose()
	content!: { mess: any; type: string }

	@Expose()
	from_id!: number

	@Expose()
	type!: string

	@Expose()
	room_id!: number

	@Expose()
	to_id!: number

	@Expose()
	createdAt!: Date

	@Expose()
	updatedAt!: Date
}
