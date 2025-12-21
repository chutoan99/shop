import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { UserModel } from '../models'
import { IUserRepository } from '../interfaces/user.interface'
import { UpdateUserDto } from '../dtos'
import { plainToClass } from 'class-transformer'
import { BaseRepository } from '@core/repositories'

export default class UserRepository
	extends BaseRepository
	implements IUserRepository
{
	private static readonly SP_FIND_BY_EMAIL = `call sp_get_user_by_email(?)`
	private static readonly SP_FIND_DETAIL = `call sp_get_user_detail(?)`
	private static readonly SP_CREATE = `call sp_create_user(?)`
	private static readonly SP_UPDATE = `call sp_update_user(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}

	public async findByEmail(email: string): Promise<UserModel> {
		const response = await this.callProcedure<UserModel[]>(
			UserRepository.SP_FIND_BY_EMAIL,
			[email]
		)

		const result =
			Array.isArray(response) && response.length > 0 ? response[0] : []

		return plainToClass(UserModel, (result as UserModel[])[0], {
			excludeExtraneousValues: true
		})
	}

	public async findByID(id: number): Promise<UserModel> {
		const response = await this.callProcedure<UserModel[]>(
			UserRepository.SP_FIND_DETAIL,
			[id]
		)

		const result =
			Array.isArray(response) && Array.isArray(response[0])
				? response[0]
				: response

		return plainToClass(UserModel, (result as UserModel[])[0], {
			excludeExtraneousValues: true
		})
	}

	public async create(payload: UserModel): Promise<boolean> {
		const response = await this.executeProcedure(UserRepository.SP_CREATE, [
			JSON.stringify(payload)
		])

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public async update(payload: UpdateUserDto): Promise<boolean> {
		const response = await this.executeProcedure(UserRepository.SP_UPDATE, [
			JSON.stringify(payload)
		])

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
