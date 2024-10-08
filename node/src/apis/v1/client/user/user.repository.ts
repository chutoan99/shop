import { LoggerSystem } from '~/systems/logger'
import { MySQlSystem } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { UserModel } from './user.model'

interface IUserRepository {
	findByEmail(email: string): Promise<UserModel>
	current(id: number): Promise<UserModel>
	create(user: UserModel): Promise<boolean>
	update(user: UserModel): Promise<boolean>
}

export default class UserRepository implements IUserRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem

	constructor() {
		this._MySQlSystem = new MySQlSystem()
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem.initDb()
	}

	public findByEmail = async (email: string): Promise<UserModel> => {
		try {
			const [response]: ResultResponse =
				await this._MySQlSystem.db.query(
					`SELECT * FROM Users WHERE email = '${email}'`
				)

			return (response as UserModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public current = async (id: number): Promise<UserModel> => {
		try {
			const [response]: ResultResponse =
				await this._MySQlSystem.db.query(
					`SELECT 
					id, 
					shopid, 
					username, 
					name, 
					email, 
					sex, 
					birthday, 
					phone, 
					address, 
					avatar, 
					filename, 
					role, 
					not_new_user, 
					createdAt,
					updatedAt
				FROM Users WHERE id = ${id} Limit 1`
				)

			return (response as UserModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public create = async (user: UserModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] = await this
				._MySQlSystem.db.execute(`
        INSERT IGNORE INTO Users 
          (id, shopid, name, username, email, sex, role, password) 
        VALUES 
          (${user.id}, ${user.shopid}, '${user.name}', '${user.username}', '${user.email}', ${user.sex}, '${user.role}', '${user.password}')
        `)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public update = async (user: UserModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] = await this
				._MySQlSystem.db.query(`
            UPDATE Users 
            SET 
              sex = '${user?.sex}',
              email = '${user.email}',
              name = CASE WHEN '${user.name}' = '' THEN NULL ELSE '${user.name}' END,
              address = CASE WHEN '${user.address}' = '' THEN NULL ELSE '${user.address}' END,
              phone = CASE WHEN '${user.phone}' IS NOT NULL THEN '${user.phone}' ELSE NULL END,
              filename = CASE WHEN '${user.filename}' IS NOT NULL THEN '${user.filename}' ELSE NULL END,
              birthday = CASE WHEN '${user.birthday}' = '' THEN NULL ELSE STR_TO_DATE('${user.birthday}', '%Y-%m-%dT%H:%i:%s.000Z') END,
              avatar = CASE WHEN '${user.avatar}' IS NOT NULL THEN '${user.avatar}' ELSE NULL END
            WHERE id = '${user.id}'
      `)

			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
