import { BaseModel } from '@core/interfaces'
import { Expose } from 'class-transformer'

export class GroupModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	name!: string

	@Expose()
	description!: string
}
