import { redisClient } from '~/configs/redis.config'

export default class RedisSystem {

  public async ensureConnected(): Promise<void> {
		if (!redisClient.isOpen) {
			await redisClient.connect()
		}
	}

	public async getCache(key: string): Promise<any> {
    console.log(key,"key")
    await this.ensureConnected()
		const data = await redisClient.get(key)
		return data ? JSON.parse(data) : null
	}

	public async setCache(
		key: string,
		data: any,
		expiry: number = 3600
	): Promise<void> {
    await this.ensureConnected()
		await redisClient.set(key, JSON.stringify(data), { EX: expiry })
	}
}
