// redis.config.ts
import EnvConfig from '@configs/env.config'
import Redis, { RedisOptions } from 'ioredis'

export default class RedisConfig {
	private static instance: RedisConfig | null = null
	private clientClient: Redis | null = null

	public static async getInstance(): Promise<RedisConfig> {
		if (!RedisConfig.instance) {
			RedisConfig.instance = new RedisConfig()
			await RedisConfig.instance.connect() // ép connect ở đây
		}
		return RedisConfig.instance
	}

	public getClient(): Redis | null {
		return this.clientClient
	}

	public async connect(): Promise<void> {
		const connectionString = EnvConfig.redis?.url
		if (!connectionString) {
			console.error('❌ Redis connection string is missing.')
			return
		}

		try {
			const options: RedisOptions = {
				retryStrategy: (times) => {
					const delay = Math.min(times * 200, 2000)
					console.log(
						`Redis reconnect attempt #${times}, retry in ${delay}ms`
					)
					return delay
				},
				reconnectOnError: (err) => {
					console.error('Redis reconnectOnError:', err.message)
					const targetErrors = ['READONLY', 'ECONNRESET', 'EPIPE']
					return targetErrors.some((e) => err.message.includes(e))
				},
				maxRetriesPerRequest: null,
				keepAlive: 1
			}

			this.clientClient = new Redis(connectionString, options)

			this.clientClient.on('connect', () => {
				console.log('✅ Connected to Redis.')
			})

			this.clientClient.on('ready', () => {
				console.log('✅ Redis client ready to use.')
			})

			this.clientClient.on('error', (err) => {
				console.error('❌ Redis error:', err.message)
			})

			this.clientClient.on('close', () => {
				console.warn('⚠️ Redis connection closed.')
			})

			this.clientClient.on('end', () => {
				console.warn('⚠️ Redis connection ended.')
			})
		} catch (err: any) {
			console.error('❌ Failed to connect to Redis:', err.message)
			this.clientClient = null
		}
	}

	public async closeConnection(): Promise<void> {
		if (this.clientClient) {
			await this.clientClient.quit()
			console.log('Redis connection closed.')
			this.clientClient = null
		}
	}
}
