import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class TabOrderModel {
	@Expose()
	@IsNumber()
	is_all!: number

	@Expose()
	@IsNumber()
	is_returns!: number

	@Expose()
	@IsNumber()
	is_success!: number

	@Expose()
	@IsNumber()
	is_cancelled!: number

	@Expose()
	@IsNumber()
	is_transport!: number

	@Expose()
	@IsNumber()
	is_delivering!: number

	@Expose()
	@IsNumber()
	is_wait_for_pay!: number

	@Expose()
	@IsNumber()
	is_wait_for_confirm!: number
}
