import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class RecordsWithCount<T> {
	@Expose()
	@IsNumber()
	total!: number

	@Expose()
	records!: T[]
}
