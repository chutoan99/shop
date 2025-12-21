import { Expose } from 'class-transformer'
import { UserInfoModel } from '../../account/models/user.model'
import { BaseModel } from '@core/model'

export class RoomModel extends BaseModel {
	@Expose()
	roomId!: number

	@Expose()
	shopId!: number

	@Expose()
	userId: any

	@Expose()
	createdAt!: string

	@Expose()
	updatedAt!: string

	@Expose()
	user!: UserInfoModel
}
