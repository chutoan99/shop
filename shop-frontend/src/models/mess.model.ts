import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IMessageModel extends IBaseModel {
	content: any
	type: string
	room_id: string
	from_id: number
	to_id: string
	created_at: Date
	updated_at: Date | null
}

export class MessageModel extends BaseModel implements IMessageModel {
	@Expose()
	content!: any

	@Expose()
	type!: string

	@Expose()
	room_id!: string

	@Expose()
	from_id!: number

	@Expose()
	to_id!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
