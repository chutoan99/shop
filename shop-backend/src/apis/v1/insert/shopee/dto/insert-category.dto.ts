import { Expose, plainToInstance } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertCategoryDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	display_name!: string

	@Expose()
	parent_catid!: number

	@Expose()
	name!: string

	@Expose()
	image!: string

	@Expose()
	unselected_image!: string

	@Expose()
	selected_image!: string

	@Expose()
	level!: number

	static fromJson(jsonData: any): InsertCategoryDto {
		return plainToInstance(InsertCategoryDto, {
			id: jsonData?.catid,
			parent_catid: jsonData.parent_catid,
			name: jsonData.name,
			display_name: jsonData.display_name,
			image: `https://cf.shopee.vn/file/${jsonData.image}`,
			unselected_image: `https://cf.shopee.vn/file/${jsonData.unselected_image}`,
			selected_image: `https://cf.shopee.vn/file/${jsonData.selected_image}`,
			level: jsonData.level
		})
	}
}
