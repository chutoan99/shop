import { Expose } from 'class-transformer'
import { PAGE_OPTIONS } from '../resources'

export default class ProductDto {
	@Expose()
	page: number = 1

	@Expose()
	limit: number = PAGE_OPTIONS[3]
}
