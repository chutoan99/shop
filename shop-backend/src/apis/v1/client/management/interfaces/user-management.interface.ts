import SearchUserManagementDto from '../dtos/search-user-management.dto'
import PaginationService from '@core/libs/pagination/pagination.service'
import { UserManagementModel } from '../models/user-management.model'
import { CreateInvitationDto, UpdateRoleDto } from '../dtos'
import { RecordsWithCount } from '@core/interfaces'

export interface IUserManagementRepository {
	findUserAndCount(
		queries: SearchUserManagementDto
	): Promise<RecordsWithCount<UserManagementModel>>

	findByUserId(userId: number): Promise<UserManagementModel[]>
	findByUserAndShop(
		userId: number,
		shopId: number
	): Promise<UserManagementModel | null>
	createInvitation(invitation: CreateInvitationDto): Promise<boolean>
	acceptInvitation(userId: number, token: string): Promise<boolean>
	removeUser(shopId: number, userId: number): Promise<boolean>
	updateRole(
		shopId: number,
		userId: number,
		role: UpdateRoleDto
	): Promise<boolean>
}

export interface IUserManagementService {
	getUserManagements(
		queries: SearchUserManagementDto,
		shopId: number,
		pagination: PaginationService
	): Promise<UserManagementModel[]>
	inviteUser(
		shopId: number,
		invitedByUserId: number,
		payload: CreateInvitationDto
	): Promise<boolean>
	acceptInvitation(userId: number, token: string): Promise<boolean>
	removeUser(
		shopId: number,
		targetUserId: number,
		removedByUserId: number
	): Promise<boolean>
	updateUserRole(
		shopId: number,
		targetUserId: number,
		role: UpdateRoleDto,
		updatedByUserId: number
	): Promise<boolean>
}
