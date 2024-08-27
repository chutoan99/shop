import { LoggerSystem } from '~/systems/logger/logger.system'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { ResultResponse } from '~/@core/systems/response'
import { UserModel } from '../user/user.model'
import { MySQlSystem } from '~/systems/dataBase'

interface IAuthRepository {
	updateRefreshToken(user: UserModel, token: string): Promise<boolean>
	updateToken(email: string, token: string, expires: number): Promise<boolean>
	logout(userId: number): Promise<boolean>
	resetPassword(email: string, password: string): Promise<boolean>
	findUserRefreshAccessToken(
		userId: number,
		refreshToken: string
	): Promise<UserModel>
}

export default class AuthRepository implements IAuthRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem

	constructor() {
		this._MySQlSystem = new MySQlSystem()
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem.initDb()
	}

	public updateRefreshToken = async (
		user: UserModel,
		token: string
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._MySQlSystem.db.query(
					`UPDATE Users SET refreshToken = '${token}', not_new_user = CASE WHEN ${user.not_new_user} IS NULL THEN TRUE ELSE FALSE END WHERE email = '${user?.email}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public updateToken = async (
		email: string,
		token: string,
		expires: number
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._MySQlSystem.db.execute(
					`UPDATE Users SET passwordResetToken = '${token}', passwordResetExpires = '${expires}' WHERE email = '${email}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public logout = async (userId: number): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._MySQlSystem.db.query(
					`UPDATE Users SET refreshToken = '' WHERE id = '${userId}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public resetPassword = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._MySQlSystem.db.query(
					`UPDATE Users SET password = '${password}', passwordChangedAt = '${Date.now()}' , passwordResetToken = '''' passwordResetExpires = '''',  WHERE email = '${email}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public findUserRefreshAccessToken = async (
		userId: number,
		refreshToken: string
	): Promise<UserModel> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(
				`SELECT * FROM Users WHERE id = '${userId}' AND refreshToken = '${refreshToken}'`
			)
			return (response as UserModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
