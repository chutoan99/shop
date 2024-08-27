import { PoolConnection } from 'mysql2/promise'
import MESSAGE from '~/@core/contains/message.json'
import WriteLogger from '~/configs/winston.config'
import connectMySQL from '~/configs/mysql.config'

export class MySQlSystem {
	public db!: PoolConnection
	public async initDb() {
		try {
			const pool = await connectMySQL()
			this.db = await pool.getConnection()
			if (!this.db) {
				throw new Error('Database connection has not been initialized.')
			}
		} catch (error: any) {
			WriteLogger.log({
				level: 'error',
				message: error.message
			})
			throw (MESSAGE.DB.INVALID_RESPONSE, error.message)
		}
	}

	public async closeConnection(): Promise<void> {
		if (this.db) {
			await this.db.release()
		}
	}
}
