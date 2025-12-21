import BaseRedis from './base-redis.system'

export default class RedisService extends BaseRedis {
	private static EXPIRY_TIME = 3600

	constructor() {
		super()
	}

	public async getCache(key: string): Promise<any> {
		this._ensureClientInitialized()
		const data = await this._clientClient!.get(key)
		return data ? JSON.parse(data) : null
	}

	public async setCache(
		key: string,
		data: any,
		expiry: number = RedisService.EXPIRY_TIME
	): Promise<void> {
		this._ensureClientInitialized()
		await this._clientClient!.set(key, JSON.stringify(data), 'EX', expiry)
	}

	public async deleteCache(key: string): Promise<void> {
		this._ensureClientInitialized()
		await this._clientClient!.del(key)
	}

	public async exists(key: string): Promise<boolean> {
		this._ensureClientInitialized()
		const result = await this._clientClient!.exists(key)
		return result === 1
	}

	public async updateExpire(key: string, expire: number): Promise<void> {
		this._ensureClientInitialized()
		await this._clientClient!.expire(key, expire)
	}

	public async flushAll(): Promise<void> {
		this._ensureClientInitialized()
		await this._clientClient!.flushall()
	}

	public async increment(
		key: string,
		incrementBy: number = 1
	): Promise<number> {
		this._ensureClientInitialized()
		const result = await this._clientClient!.incrby(key, incrementBy)
		return result
	}

	public async decrement(
		key: string,
		decrementBy: number = 1
	): Promise<number> {
		this._ensureClientInitialized()
		const result = await this._clientClient!.decrby(key, decrementBy)
		return result
	}

	public async keys(pattern: string): Promise<string[]> {
		this._ensureClientInitialized()
		const result = await this._clientClient!.keys(pattern)
		return result
	}

	public async hashGet(hash: string, field: string): Promise<any> {
		this._ensureClientInitialized()
		const data = await this._clientClient!.hget(hash, field)
		return data ? JSON.parse(data) : null
	}

	public async hashGetAll(hash: string): Promise<Record<string, any>> {
		this._ensureClientInitialized()
		const data = await this._clientClient!.hgetall(hash)
		const result: Record<string, any> = {}
		for (const key in data) {
			result[key] = JSON.parse(data[key])
		}
		return result
	}

	public async hashSet(
		hash: string,
		field: string,
		value: any
	): Promise<void> {
		this._ensureClientInitialized()
		await this._clientClient!.hset(hash, field, JSON.stringify(value))
	}

	public async hashDelete(hash: string, field: string): Promise<void> {
		this._ensureClientInitialized()
		await this._clientClient!.hdel(hash, field)
	}
}
