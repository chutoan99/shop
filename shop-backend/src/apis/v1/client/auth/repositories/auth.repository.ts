import { FieldPacket, ResultSetHeader } from 'mysql2'
import MySQLService, { ResultResponse } from '@core/libs/mysql/mysql.service'
import { UserModel } from '../../user/models'
import { IAuthRepository } from '../interfaces'
import LoggerService from '@core/libs/logger/logger.system'

export default class AuthRepository implements IAuthRepository {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _mySQLService: MySQLService
	) {}

	public updateRefreshToken = async (
		user: UserModel,
		token: string
	): Promise<boolean> => {
		try {
			const sql = `UPDATE users SET refresh_token = '${token}', not_new_user = CASE WHEN ${user.not_new_user} IS NULL THEN TRUE ELSE FALSE END WHERE email = '${user?.email}'`

			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._mySQLService.execute(sql)

			this._loggerService.info(sql)

			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public updateToken = async (
		email: string,
		token: string,
		expires: number
	): Promise<boolean> => {
		try {
			const sql = `UPDATE users SET password_reset_token = '${token}', password_reset_expires = '${expires}' WHERE email = '${email}'`

			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._mySQLService.execute(sql)

			this._loggerService.info(sql)

			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public logout = async (userId: number): Promise<boolean> => {
		try {
			const sql = `UPDATE users SET refresh_token = '' WHERE id = '${userId}'`

			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._mySQLService.execute(sql)

			this._loggerService.info(sql)

			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public resetPassword = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const sql = `UPDATE users SET password = '${password}', password_changed_at = '${Date.now()}' , password_reset_token = '''' password_reset_expires = '''',  WHERE email = '${email}'`

			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._mySQLService.execute(sql)

			this._loggerService.info(sql)

			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public findUserRefreshAccessToken = async (
		userId: number,
		refreshToken: string
	): Promise<UserModel> => {
		try {
			const sql = `SELECT * FROM users WHERE id = '${userId}' AND refresh_token = '${refreshToken}'`

			const [response]: ResultResponse = await this._mySQLService.query(
				sql
			)

			this._loggerService.info(sql)

			return (response as UserModel[])[0]
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
