import { Expose } from 'class-transformer'

export class UserHasGroupModel {
	@Expose()
	user_id!: number

	@Expose()
	group_id!: number
}
