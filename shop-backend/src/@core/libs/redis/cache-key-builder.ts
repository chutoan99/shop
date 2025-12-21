import { instanceToPlain } from 'class-transformer'
import crypto from 'crypto'

export interface CacheKeyOptions {
	module?: string
	entity?: string
	action?: string
	identifier?: string | number
	extra?: Record<string, string | number> | object
}
export class CacheKeyBuilder {
	/**
	 * Build cache key theo convention:
	 * <module>:<entity>:<action>:<identifier>:<extra>
	 */
	static build(options: CacheKeyOptions): string {
		const { module, entity, action, identifier, extra } = options
		const keyParts = [module]

		if (entity) keyParts.push(entity)
		if (action) keyParts.push(action)
		if (identifier !== undefined) keyParts.push(String(identifier))

		// append thêm key=value nếu có extra
		if (extra) {
			const plain =
				typeof extra === 'object' ? instanceToPlain(extra) : extra

			Object.entries(plain as Record<string, any>).forEach(([k, v]) =>
				keyParts.push(`${k}=${v}`)
			)
		}

		return keyParts.join(':')
	}

	static buildPrefix(options: Omit<CacheKeyOptions, 'extra'>): string {
		const { module, entity, action, identifier } = options
		const keyParts = [module]

		if (entity) keyParts.push(entity)
		if (action) keyParts.push(action)
		if (identifier !== undefined) keyParts.push(String(identifier))

		return keyParts.join(':')
	}

	static buildWithHash(module: string, params: Record<string, any>): string {
		const hash = crypto
			.createHash('md5')
			.update(JSON.stringify(params))
			.digest('hex')
		return `${module}:${hash}`
	}
}
