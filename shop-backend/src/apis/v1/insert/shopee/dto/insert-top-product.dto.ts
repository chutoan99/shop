import { Expose, plainToInstance } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertTopProductDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	data_type!: string

	@Expose()
	count!: number

	@Expose()
	name!: string

	@Expose()
	images!: string

	@Expose()
	sort_type!: number

	@Expose()
	best_price!: number

	@Expose()
	display_text!: string

	static fromJson(jsonData: any): InsertTopProductDto {
		return plainToInstance(InsertTopProductDto, {
			data_type: jsonData?.data_type,
			count: jsonData?.count,
			name: jsonData?.name,
			images: (
				jsonData?.images?.map((item: any) => {
					return `https://cf.shopee.vn/file/${item}`
				}) as any
			).join(','),
			sort_type: jsonData?.sorttype,
			best_price: jsonData?.best_price,
			display_text: jsonData?.display_text
		})
	}
}
