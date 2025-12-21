import { BaseRepository } from '@core/repositories'
import { IUserManagementRepository } from '../interfaces/user-management.interface'
import { UserManagementModel } from '../models/user-management.model'
import { CreateInvitationDto, UpdateRoleDto } from '../dtos/user-management.dto'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { plainToClass, plainToInstance } from 'class-transformer'
import SearchUserManagementDto from '../dtos/search-user-management.dto'
import { RecordsWithCount } from '@core/interfaces'

export default class UserManagementRepository
	extends BaseRepository
	implements IUserManagementRepository
{
	private static readonly SP_FIND_BY_SHOP = 'call sp_get_shop_users(?)'
	private static readonly SP_FIND_BY_USER = 'call sp_get_user_shops(?)'
	private static readonly SP_FIND_BY_USER_AND_SHOP =
		'call sp_get_shop_user(?, ?)'
	private static readonly SP_CREATE_INVITATION =
		'call sp_create_shop_invitation(?)'
	private static readonly SP_ACCEPT_INVITATION =
		'call sp_accept_shop_invitation(?, ?)'
	private static readonly SP_REMOVE_USER = 'call sp_remove_shop_user(?, ?)'
	private static readonly SP_UPDATE_ROLE =
		'call sp_update_shop_user_role(?, ?, ?)'

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public findUserAndCount = async (
		queries: SearchUserManagementDto
	): Promise<RecordsWithCount<UserManagementModel>> => {
		const response = await this.callProcedure<any[]>(
			UserManagementRepository.SP_FIND_BY_SHOP,
			[JSON.stringify(queries)]
		)

		const total =
			Array.isArray(response) && response[0]?.[0]?.total
				? response[0][0].total
				: 0

		const posts =
			Array.isArray(response) && Array.isArray(response[1])
				? (response[1] as UserManagementModel[])
				: []

		return {
			total: total,
			records: plainToInstance(
				UserManagementModel,
				posts as UserManagementModel[],
				{
					excludeExtraneousValues: true
				}
			)
		}
	}

	public async findByUserId(userId: number): Promise<UserManagementModel[]> {
		const response = await this.callProcedure<UserManagementModel[]>(
			UserManagementRepository.SP_FIND_BY_USER,
			[userId]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToClass(
			UserManagementModel,
			result as UserManagementModel[],
			{
				excludeExtraneousValues: true
			}
		)
	}

	public async findByUserAndShop(
		userId: number,
		shopId: number
	): Promise<UserManagementModel | null> {
		const response = await this.callProcedure<UserManagementModel[]>(
			UserManagementRepository.SP_FIND_BY_USER_AND_SHOP,
			[userId, shopId]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0][0]
				: null

		return result
			? plainToClass(UserManagementModel, result, {
					excludeExtraneousValues: true
			  })
			: null
	}

	public async createInvitation(
		invitation: CreateInvitationDto
	): Promise<boolean> {
		const response = await this.executeProcedure(
			UserManagementRepository.SP_CREATE_INVITATION,
			[JSON.stringify(invitation)]
		)
		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public async acceptInvitation(
		userId: number,
		token: string
	): Promise<boolean> {
		const response = await this.executeProcedure(
			UserManagementRepository.SP_ACCEPT_INVITATION,
			[userId, token]
		)
		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public async removeUser(shopId: number, userId: number): Promise<boolean> {
		const response = await this.executeProcedure(
			UserManagementRepository.SP_REMOVE_USER,
			[shopId, userId]
		)
		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public async updateRole(
		shopId: number,
		userId: number,
		role: UpdateRoleDto
	): Promise<boolean> {
		const response = await this.executeProcedure(
			UserManagementRepository.SP_UPDATE_ROLE,
			[shopId, userId, role.role]
		)
		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
