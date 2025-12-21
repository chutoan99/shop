import express, { Router } from 'express'
import UserRepository from './repositories/user.repository'
import UserService from './services/user.service'
import CloudINaryService from '@core/libs/uploads/services/cloudinary.service'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'
import UserController from './controllers/user.controller'
import { UserValidator } from './validators/user.validator'

const UserModule = (sctx: ServiceContext) => {
	const userRepository = new UserRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const userValidator = new UserValidator(sctx.loggerService, userRepository)

	const userService = new UserService(
		sctx.loggerService,
		sctx.redisService,
		userValidator,
		userRepository
	)
	const userController = new UserController(
		userService,
		sctx.cloudINaryService
	)

	const router: Router = express.Router()

	router.get(
		'/current',
		JwtMiddlewares.verifyToken,
		userController.findUser as any
	)
	router.put(
		'/',
		JwtMiddlewares.verifyToken,
		new CloudINaryService().singleFile('image'),
		userController.updateCurrent as any
	)

	return router
}

export default UserModule
