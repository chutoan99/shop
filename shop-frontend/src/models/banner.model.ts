import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export interface IBannerModel extends IBaseModel {
	id: number
	image_url: string
	created_at: Date
	updated_at: Date | null
}

export class BannerModel extends BaseModel implements IBannerModel {
	@Expose()
	id!: number

	@Expose()
	image_url!: string

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}
