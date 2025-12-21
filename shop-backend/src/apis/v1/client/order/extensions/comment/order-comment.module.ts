import express from 'express'
import CloudINaryService from '@core/libs/uploads/services/cloudinary.service'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'
import UserRepository from '@user/repositories/user.repository'
import OrderCommentRepository from './repository/order-comment.repository'
import OrderCommentService from './service/order-comment.service'
import OrderCommentController from './controller/order-comment.controller'

const OrderCommentModule = (sctx: ServiceContext) => {
	const orderCommentRepository = new OrderCommentRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const userRepository = new UserRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const orderCommentService = new OrderCommentService(
		sctx.loggerService,
		userRepository,
		orderCommentRepository
	)
	const orderCommentController = new OrderCommentController(
		orderCommentService,
		sctx.cloudINaryService
	)

	const router = express.Router()

	router.post(
		'',
		JwtMiddlewares.verifyToken,
		new CloudINaryService().multipleFile('images', 5),
		orderCommentController.create as any
	)

	return router
}

export default OrderCommentModule
