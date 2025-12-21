import { CreateGroupDto, UpdateGroupDto } from '../dtos'
import { PermissionModel } from '../models/permission.model'
import { PermissionInterface } from '../services/permission-container.service'

export interface IPermissionRepository {
	findAll(): Promise<PermissionModel[]>
	create(payload: PermissionInterface[]): Promise<boolean>
}
