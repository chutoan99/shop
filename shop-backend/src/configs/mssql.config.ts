import sql from 'mssql'
import EnvConfig from './env.config'

export default class MsSQLConfig {
	private static instance: MsSQLConfig | null = null
	private pool: sql.ConnectionPool | null | undefined = null

	public static async getInstance(): Promise<MsSQLConfig> {
		if (!MsSQLConfig.instance) {
			MsSQLConfig.instance = new MsSQLConfig()
			await MsSQLConfig.instance._connect()
		}
		return MsSQLConfig.instance
	}

	public getPool(): sql.ConnectionPool | null | undefined {
		return this.pool
	}

	public closeConnection() {
		if (this.pool) {
			this.pool.close()
			console.log('MSSQL connection pool closed.')
			this.pool = null
		}
	}

	private async _connect(): Promise<void> {
		this.pool = await sql.connect({
			user: EnvConfig.sqlServer.user,
			password: EnvConfig.sqlServer.password,
			port: Number(EnvConfig.sqlServer.password),
			server: String(EnvConfig.sqlServer.server),
			database: EnvConfig.sqlServer.database,
			options: {
				trustedConnection: true,
				trustServerCertificate: true,
				enableArithAbort: true,
				encrypt: true,
				useUTC: false
			}
		})
		console.log('Connection to MSSQL database successful.')
	}
}
