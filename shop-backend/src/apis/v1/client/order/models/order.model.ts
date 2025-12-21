import { BaseModel } from '@core/interfaces/models/base-model'
import { Expose } from 'class-transformer'
import { UserModel } from '../../user/models'

export class OrderModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	user_id!: number

	@Expose()
	final_total!: number

	@Expose()
	user!: UserModel

	@Expose()
	ship_cost!: number

	@Expose()
	state!: string

	@Expose()
	type!: number

	@Expose()
	shiped!: boolean
}
