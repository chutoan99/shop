import { Expose, plainToInstance } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertIndustryDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	parent_cat_id!: number

	@Expose()
	level!: number

	@Expose()
	category_name!: string

	@Expose()
	images!: string

	static fromJson(jsonData: any, level: any): InsertIndustryDto {
		return plainToInstance(InsertIndustryDto, {
			id: jsonData.path[level].category_id,
			parent_cat_id:
				level === 0 ? 0 : jsonData.path[level - 1].category_id,
			level: level,
			category_name: jsonData.path[level].category_name,
			images: jsonData.images[level],
			is_active: true
		})
	}
}
