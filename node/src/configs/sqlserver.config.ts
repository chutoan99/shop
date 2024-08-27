import sql, { ConnectionPool } from 'mssql'
import dotenv from 'dotenv'
import WriteLogger from './winston.config'
dotenv.config()

const connectSQLServer = async (): Promise<ConnectionPool | undefined> => {
	try {
		const pool = await sql.connect({
			user: process.env.SQL_SERVER_USER,
			password: process.env.SQL_SERVER_PASSWORD,
			port: Number(process.env.SQL_SERVER_PORT),
			server: String(process.env.SQL_SERVER_HOST),
			database: process.env.SQL_SERVER_DATABASE, 
			options: {
				trustedConnection: true, 
				trustServerCertificate: true,
        enableArithAbort: true, 
        encrypt: true,
        useUTC: false
			}
		})

		return pool
	} catch (error: any) {
		WriteLogger.log({
			level: 'error',
			message: error.message
		})
		console.error('Could not connect to SQL Server:', error.message)
		return undefined
	}
}

export default connectSQLServer
