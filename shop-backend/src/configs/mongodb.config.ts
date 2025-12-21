import mongoose from 'mongoose'
import EnvConfig from './env.config'
mongoose.set('strictQuery', false)
export default class MongooseConfig {
	private static instance: MongooseConfig | null = null
	private pool: mongoose.Connection | null = null

	public static async getInstance(): Promise<MongooseConfig> {
		if (!MongooseConfig.instance) {
			MongooseConfig.instance = new MongooseConfig()
			await MongooseConfig.instance._connect()
		}
		return MongooseConfig.instance
	}

	public getPool(): mongoose.Connection | null {
		return this.pool
	}

	public closeConnection() {
		if (this.pool) {
			this.pool.close()
			console.log('MongoDB connection pool closed.')
			this.pool = null
		}
	}

	private async _connect(): Promise<void> {
		const connectionString = EnvConfig.mongo?.url
		if (!connectionString) {
			throw new Error('MongoDB connection string is missing.')
		}

		await mongoose.connect(connectionString)
		this.pool = mongoose.connection

		console.log('Connection to MongoDB database successful.')
	}
}
