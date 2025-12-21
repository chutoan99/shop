import { Expose } from 'class-transformer'
import { BaseModel, IBaseModel } from '@core/interfaces'

export interface ISuggestSearchModel extends IBaseModel {
	id: number
	text: string
	count: number
	created_at: Date
	updated_at: Date | null
}

export class SuggestSearchModel extends BaseModel implements ISuggestSearchModel {
	@Expose()
	id!: number

	@Expose()
	text!: string

	@Expose()
	count!: number

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
