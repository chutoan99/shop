import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class SuggestSearchModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	text!: string

	@Expose()
	count!: number
}
