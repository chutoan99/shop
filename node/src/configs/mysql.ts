import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connectMySQL = () => {
	const connectionString = process.env.MYSQL_URl
	if (!connectionString) {
		throw new Error('MongoDB connection string is missing.')
	}

	const pool = mysql.createPool({
		uri: connectionString,
		connectionLimit: 10
	})
	console.log('Connection to Mysql database successful.')

	return pool
}

export default connectMySQL
