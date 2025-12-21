import { CreateGroupDto, UpdateGroupDto } from '../dtos'
import { GroupModel } from '../models/group.model'

export interface IGroupRepository {
	findAll(): Promise<GroupModel[]>
	findById(id: number): Promise<GroupModel>
	create(payload: CreateGroupDto): Promise<boolean>
	update(payload: UpdateGroupDto): Promise<boolean>
	delete(id: number): Promise<boolean>
}

export interface IGroupService {
	getGroups(): Promise<GroupModel[]>
	getGroupById(id: number): Promise<GroupModel>
	createGroup(payload: CreateGroupDto): Promise<void>
	updateGroup(payload: UpdateGroupDto): Promise<void>
	deleteGroup(id: number): Promise<void>
}
