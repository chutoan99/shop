import { Expose } from 'class-transformer'
import { UserManagementRole } from '../consts/user-role'

export class UserManagementModel {
	@Expose()
	id!: number

	@Expose()
	shopId!: number

	@Expose()
	userId!: number

	@Expose()
	role!: UserManagementRole

	@Expose()
	isActive!: boolean

	@Expose()
	invitedBy?: number

	@Expose()
	invitedAt?: Date

	@Expose()
	acceptedAt?: Date

	@Expose()
	createdAt?: Date

	@Expose()
	updatedAt?: Date
}
