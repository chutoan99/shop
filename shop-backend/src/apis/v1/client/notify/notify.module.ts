import express from 'express'
import NotifyService from './services/notify.service'
import NotifyController from './controllers/notify.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const NotifyModule = (sctx: ServiceContext) => {
	const notifyService = new NotifyService(
		sctx.redisService,
		sctx.loggerService
	)
	const notifyController = new NotifyController(notifyService)

	const router = express.Router()

	router.get('/', JwtMiddlewares.verifyToken, notifyController.findAll as any)

	return router
}

export default NotifyModule
