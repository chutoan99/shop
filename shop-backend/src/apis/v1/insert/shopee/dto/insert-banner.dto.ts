import { Expose, plainToInstance } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertBannerDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	image_url!: string

	static fromJson(jsonData: any): InsertBannerDto {
		return plainToInstance(InsertBannerDto, {
			image_url: jsonData?.image_url
		})
	}
}
