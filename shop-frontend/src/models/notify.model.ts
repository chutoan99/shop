import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface INotifyModel extends IBaseModel {
	_id: number
	image: string
	title: string
	content: string
	userid: number | null
	seen: number
	time: string
	created_at: Date
	updated_at: Date | null
}

export class NotifyModel extends BaseModel implements INotifyModel {
	@Expose()
	_id!: number

	@Expose()
	image!: string

	@Expose()
	title!: string

	@Expose()
	content!: string

	@Expose()
	userid!: number | null

	@Expose()
	seen!: number

	@Expose()
	time!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
