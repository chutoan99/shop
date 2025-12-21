import RedisConfig from '@configs/redis.config'
import { Redis } from 'ioredis'

export default class BaseRedis {
	protected _clientClient: Redis | null = null

	constructor() {
		this._initializeClient()
	}

	protected _initializeClient = async (): Promise<void> => {
		if (!this._clientClient) {
			const redisConfig = await RedisConfig.getInstance()
			this._clientClient = redisConfig.getClient()
		}
	}

	protected _ensureClientInitialized(): void {
		if (!this._clientClient) {
			throw new Error('Redis client is not initialized.')
		}
	}
}
