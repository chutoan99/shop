// src/configs/mysql.config.ts
import mysql from 'mysql2/promise'
import EnvConfig from './env.config'

export default class MySQLConfig {
	static instance: MySQLConfig | null = null
	private pool: mysql.Pool | null = null

	public static async getInstance(): Promise<MySQLConfig> {
		if (!MySQLConfig.instance) {
			MySQLConfig.instance = new MySQLConfig()
			await MySQLConfig.instance._connect()
		}
		return MySQLConfig.instance
	}

	// ✅ Thêm hàm công khai để lấy instance
	public static getInstanceSync(): MySQLConfig | null {
		return MySQLConfig.instance
	}

	public getPool(): mysql.Pool {
		if (!this.pool) throw new Error('MySQL pool not initialized')
		return this.pool
	}

	private async _connect(): Promise<void> {
		this.pool = mysql.createPool({
			host: EnvConfig.mysql.host,
			user: EnvConfig.mysql.user,
			password: EnvConfig.mysql.password,
			database: EnvConfig.mysql.name,
			port: Number(EnvConfig.mysql.port),
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			multipleStatements: true
		})
		console.log('✅ MySQL pool created.')
	}
}
