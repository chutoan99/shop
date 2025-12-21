import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class BatchListModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	banner_image!: string

	@Expose()
	title!: string

	@Expose()
	end!: Date

	@Expose()
	start!: Date
}
