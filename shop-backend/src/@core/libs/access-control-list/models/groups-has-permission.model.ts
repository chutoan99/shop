import { Expose } from 'class-transformer'

export class GroupsHasPermissionModel {
	@Expose()
	group_id!: number

	@Expose()
	permission_id!: number
}
