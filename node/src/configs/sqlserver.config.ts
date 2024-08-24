import sql from 'mssql'
import dotenv from 'dotenv'
import WriteLogger from './winston.config'
dotenv.config()

const connectSQLServer = async () => {
	try {
		await sql.connect({
			user: process.env.SQL_SERVER_USER,
			password: process.env.SQL_SERVER_PASSWORD,
      port: Number(process.env.SQL_SERVER_PORT),
			server: String(process.env.SQL_SERVER_HOST),
      options: {
        trustedConnection: true, // Set to true if using Windows Authentication
        trustServerCertificate: true, // Set to true if using self-signed certificates
      },
		})
		console.log('Connection to sql database successful.')
	} catch (error: any) {
		WriteLogger.log({
			level: 'error',
			message: error.message
		})
		console.error('Could not connect sql server:', error.message)
	}
}

export default connectSQLServer
