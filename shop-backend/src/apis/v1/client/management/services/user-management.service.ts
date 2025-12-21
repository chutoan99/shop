import { MESSAGE } from '@core/resources'
import LoggerService from '@core/libs/logger/logger.system'
import { IUserManagementService } from '../interfaces/user-management.interface'
import { UserManagementModel } from '../models/user-management.model'
import { CreateInvitationDto, UpdateRoleDto } from '../dtos/user-management.dto'
import { IEventPublisher, RecordsWithCount } from '@core/interfaces'
import UserManagementRepository from '../repositories/user-management.repository'
import SearchUserManagementDto from '../dtos/search-user-management.dto'
import PaginationService from '@core/libs/pagination/pagination.service'
import { UserManagementRole } from '../consts/user-role'

export default class UserManagementService implements IUserManagementService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _userManagementRepo: UserManagementRepository,
		private readonly _eventPublisher: IEventPublisher
	) {}

	public async getUserManagements(
		queries: SearchUserManagementDto,
		userId: number,
		pagination: PaginationService
	): Promise<UserManagementModel[]> {
		try {
			const result: RecordsWithCount<UserManagementModel> =
				await this._userManagementRepo.findUserAndCount(queries)

			const response: UserManagementModel[] =
				result.records as UserManagementModel[]

			pagination.setTotal(result.total)

			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public async inviteUser(
		shopId: number,
		invitedByUserId: number,
		payload: CreateInvitationDto
	): Promise<boolean> {
		try {
			// Check if inviter is admin/owner
			const inviter = await this._userManagementRepo.findByUserAndShop(
				invitedByUserId,
				shopId
			)
			// if (
			// 	!inviter ||
			// 	![UserManagementRole.OWNER, UserManagementRole.ADMIN].includes(
			// 		inviter.role
			// 	)
			// ) {
			// 	throw new Error(MESSAGE.UNAUTHORIZED)
			// }

			const isCreated = await this._userManagementRepo.createInvitation(
				payload
			)
			if (!isCreated) {
				throw new Error(MESSAGE.CREATE.FAIL)
			}

			// TODO: Publish event for sending invitation email
			// this._eventPublisher.publish(
			//     new ShopInvitationEvent(payload.email, shopId, invitedByUserId)
			// )

			return true
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public async acceptInvitation(
		userId: number,
		token: string
	): Promise<boolean> {
		try {
			return await this._userManagementRepo.acceptInvitation(
				userId,
				token
			)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public async removeUser(
		shopId: number,
		targetUserId: number,
		removedByUserId: number
	): Promise<boolean> {
		try {
			// Check if remover is admin/owner
			const remover = await this._userManagementRepo.findByUserAndShop(
				removedByUserId,
				shopId
			)
			// if (
			// 	!remover ||
			// 	![UserManagementRole.OWNER, UserManagementRole.ADMIN].includes(
			// 		remover.role
			// 	)
			// ) {
			// 	throw new Error(MESSAGE.UNAUTHORIZED)
			// }

			// Check target user's role
			const target = await this._userManagementRepo.findByUserAndShop(
				targetUserId,
				shopId
			)
			if (!target) {
				throw new Error(MESSAGE.USER.NOT_FOUND)
			}

			// Cannot remove owner
			if (target.role === UserManagementRole.OWNER) {
				throw new Error('Cannot remove shop owner')
			}

			// Admin cannot remove other admin
			// if (
			// 	remover.role === UserManagementRole.ADMIN &&
			// 	target.role === UserManagementRole.ADMIN
			// ) {
			// 	throw new Error('Admin cannot remove other admin')
			// }

			return await this._userManagementRepo.removeUser(
				shopId,
				targetUserId
			)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public async updateUserRole(
		shopId: number,
		targetUserId: number,
		role: UpdateRoleDto,
		updatedByUserId: number
	): Promise<boolean> {
		try {
			// Only owner can update roles
			const updater = await this._userManagementRepo.findByUserAndShop(
				updatedByUserId,
				shopId
			)
			// if (!updater || updater.role !== UserManagementRole.OWNER) {
			// 	throw new Error(MESSAGE.UNAUTHORIZED)
			// }

			// Check target user
			const target = await this._userManagementRepo.findByUserAndShop(
				targetUserId,
				shopId
			)
			if (!target) {
				throw new Error(MESSAGE.USER.NOT_FOUND)
			}

			// Cannot change owner's role
			if (target.role === UserManagementRole.OWNER) {
				throw new Error('Cannot change owner role')
			}

			return await this._userManagementRepo.updateRole(
				shopId,
				targetUserId,
				role
			)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
