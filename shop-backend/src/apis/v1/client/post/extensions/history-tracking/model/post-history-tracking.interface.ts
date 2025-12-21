import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class PostHistoryTrackingModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	user_id!: number

	@Expose()
	text!: string
}
