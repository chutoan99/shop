import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IBatchListModel extends IBaseModel {
	id: number
	banner_image: string
	title: string
	start: string
	end: string
	created_at: Date
	updated_at: Date | null
}

export class BatchListModel extends BaseModel implements IBatchListModel {
	@Expose()
	id!: number

	@Expose()
	banner_image!: string

	@Expose()
	title!: string

	@Expose()
	start!: string

	@Expose()
	end!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
