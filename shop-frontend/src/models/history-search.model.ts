import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IHistorySearchModel extends IBaseModel {
	id: number
	user_id: number
	text: string
	created_at: Date
	updated_at: Date | null
}

export class HistorySearchModel extends BaseModel implements IHistorySearchModel {
	@Expose()
	id!: number

	@Expose()
	user_id!: number

	@Expose()
	text!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
