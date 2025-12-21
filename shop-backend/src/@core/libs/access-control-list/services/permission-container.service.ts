import LoggerService from '@core/libs/logger/logger.system'
import RedisService from '@core/libs/redis/redis.service'
import PermissionRepository from '../repositories/permission.repository'
import { PermissionModel } from '../models/permission.model'
import { permissions } from '../const/permission'
import {
	OnApplicationBootstrap,
	OnModuleInit
} from '@core/enums/app-lifecycle.enum'

export interface PermissionInterface {
	name: string
	slug: string
	tag: string[]
	fromModule?: string
	module?: string
}

export class PermissionContainerService
	implements OnModuleInit, OnApplicationBootstrap
{
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _permissionRepository: PermissionRepository
	) {}

	static container: PermissionInterface[] = []
	static containerSlug: string[] = []

	static getPermissions(module: string) {
		return PermissionContainerService.container.filter(
			(permission) => permission.module === module
		)
	}

	static register(permissions: PermissionInterface[], module?: string) {
		for (const permission of permissions) {
			if (!this.containerSlug.includes(permission.slug)) {
				this.container.push({
					...permission,
					module
				})
				this.containerSlug.push(permission.slug)
			}
		}
	}

	onModuleInit(): any {
		PermissionContainerService.register(permissions, 'core')
	}

	onApplicationBootstrap(): any {
		setTimeout(() => {
			this.seedNewPermissions()
		}, 4000)
	}

	private seedNewPermissions() {
		this._permissionRepository
			.findAll()
			.then((dbPermissions: PermissionModel[]) => {
				const dbPermissionSlugs = dbPermissions.map(
					(permission) => permission.slug
				)
				const permissionEntities: PermissionInterface[] =
					PermissionContainerService.container
						.filter((permission) => {
							return !dbPermissionSlugs.includes(permission.slug)
						})
						.map((permission) => permission)

				if (permissionEntities.length) {
					this._permissionRepository
						.create(permissionEntities)
						.then((result) => console.log(result))
						.catch((error) => {
							this._loggerService.error(
								'Save new Permissions error',
								error
							)
						})
				}

				//
				dbPermissions.filter((permission) => {
					return !PermissionContainerService.containerSlug.includes(
						permission.slug
					)
				})
			})
	}
}
