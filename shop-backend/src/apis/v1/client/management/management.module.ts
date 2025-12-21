import express from 'express'
import UserManagementRepository from './repositories/user-management.repository'
import UserManagementService from './services/user-management.service'
import UserManagementController from './controllers/user-management.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const ManagementModule = (sctx: ServiceContext) => {
	const userManagementRepo = new UserManagementRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const userManagementService = new UserManagementService(
		sctx.loggerService,
		userManagementRepo,
		sctx.eventPublisher
	)
	const userManagementController = new UserManagementController(
		userManagementService
	)

	const router = express.Router()

	router.get(
		'/:shopId/users',
		JwtMiddlewares.verifyToken,
		userManagementController.getUserManagements as any
	)

	router.post(
		'/:shopId/invite',
		JwtMiddlewares.verifyToken,
		userManagementController.inviteUser as any
	)

	router.post(
		'/invitations/:token/accept',
		JwtMiddlewares.verifyToken,
		userManagementController.acceptInvitation as any
	)

	router.delete(
		'/:shopId/users/:targetUserId',
		JwtMiddlewares.verifyToken,
		userManagementController.removeUser as any
	)

	router.put(
		'/:shopId/users/:targetUserId/role',
		JwtMiddlewares.verifyToken,
		userManagementController.updateUserRole as any
	)

	return router
}

export default ManagementModule
