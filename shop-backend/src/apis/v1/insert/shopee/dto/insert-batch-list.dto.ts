import { Expose, plainToInstance } from 'class-transformer'
import { formatDateV2 } from '@helpers/date.helper'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertBatchListDto extends InsertBaseDto {
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

	static fromJson(jsonData: any): InsertBatchListDto {
		return plainToInstance(InsertBatchListDto, {
			banner_image: jsonData?.banner_image,
			title: JSON.parse(jsonData.navigate_params.navbar.title).default,
			end: formatDateV2(jsonData?.end),
			start: formatDateV2(jsonData?.start)
		})
	}
}
