import express, { Router } from 'express'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'
import GroupRepository from './repositories/group.repository'
import GroupService from './services/group.service'
import GroupController from './controllers/group.controller'
import { PermissionContainerService } from './services/permission-container.service'
import PermissionRepository from './repositories/permission.repository'
import { LifecycleManager } from '@core/services/lifecycle-manager.service'

const AccessControlListModule = (sctx: ServiceContext) => {
	const groupRepository = new GroupRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const groupService = new GroupService(
		sctx.loggerService,
		sctx.redisService,
		groupRepository
	)

	const permissionRepository = new PermissionRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const permissionContainerService = new PermissionContainerService(
		sctx.loggerService,
		sctx.redisService,
		permissionRepository
	)

	const groupController = new GroupController(groupService)

	const router: Router = express.Router()

	router.get('/', JwtMiddlewares.verifyToken, groupController.findAll as any)
	router.get(
		'/:id',
		JwtMiddlewares.verifyToken,
		groupController.findById as any
	)
	router.post('/', JwtMiddlewares.verifyToken, groupController.create as any)
	router.put('/', JwtMiddlewares.verifyToken, groupController.update as any)
	router.delete(
		'/:id',
		JwtMiddlewares.verifyToken,
		groupController.delete as any
	)

	// CUSTOM NestJS DI container
	LifecycleManager.register(permissionContainerService)

	return router
}

export default AccessControlListModule
