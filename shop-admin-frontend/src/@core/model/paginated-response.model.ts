import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from './base.model'

@Exclude()
export class PaginationModel extends BaseModel {
	@Expose()
	total!: number

	@Expose()
	totalPage!: number

	@Expose()
	currentPage!: number

	@Expose()
	offset!: number

	@Expose()
	limit!: number
}
