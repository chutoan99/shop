const Redis = require('redis')
import dotenv from 'dotenv'
import WriteLogger from './winston.config'

dotenv.config()

export const redisClient = Redis.createClient({
	url: process.env.REDIS_URL
})

const connectRedis = async () => {
	try {
		redisClient.on('connect', () => {
			console.log('Successfully connected to Redis ')
		})
		redisClient.on('error', (error: any) => {
      console.log(error,"error")
			WriteLogger.log({
				level: 'error',
				message: error.message
			})
			process.exit(1)
		})

		await redisClient.connect()
	} catch (error: any) {
		WriteLogger.log({
			level: 'error',
			message: error.message
		})
		console.error('Redis Could not connect:', error.message)
	}
}

export default connectRedis
