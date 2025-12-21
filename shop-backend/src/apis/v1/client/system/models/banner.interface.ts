import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class BannerModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	image_url!: string
}
