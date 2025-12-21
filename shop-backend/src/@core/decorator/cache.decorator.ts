import RedisService from '@core/libs/redis/redis.service'
import { plainToInstance } from 'class-transformer'

const redis = new RedisService()

/**
 * Cache decorator for methods
 * @param cacheKey - The cache key to store and retrieve data
 * @param dtoClass - Optional DTO class for transforming cached data
 */
export function Cache(cacheKey: string, dtoClass?: any) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			try {
				const cachedData = await redis.getCache(cacheKey)
				if (cachedData) {
					return dtoClass
						? plainToInstance(dtoClass, cachedData)
						: cachedData
				}

				// Call the original method if no cache exists
				const result = await originalMethod.apply(this, args)
				// Save result in cache
				await redis.setCache(cacheKey, result)

				return result
			} catch (error) {
				console.error(
					`Error in @Cache decorator for ${propertyKey}:`,
					error
				)
				throw error
			}
		}

		return descriptor
	}
}

/**
 * SetCache decorator to store data in cache after method execution.
 * @param cacheKey - The cache key for storing the result.
 * @param ttl - Optional time-to-live (TTL) for the cache entry in seconds.
 */
export function SetCache(cacheKey: string, ttl?: number) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			try {
				// Execute the original method and get its result
				const result = await originalMethod.apply(this, args)

				// Save the result to cache
				if (ttl) {
					await redis.setCache(cacheKey, result, ttl)
				} else {
					await redis.setCache(cacheKey, result)
				}

				return result
			} catch (error) {
				console.error(
					`Error in @SetCache decorator for ${propertyKey}:`,
					error
				)
				throw error
			}
		}

		return descriptor
	}
}
