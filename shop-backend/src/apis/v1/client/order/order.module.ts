import express from 'express'
import OrderRepository from './repositories/order.repository'
import OrderService from './services/order.service'
import OrderController from './controllers/order.controller'
import OrderCommentModule from './extensions/comment/order-comment.module'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const OrderModule = (sctx: ServiceContext) => {
	const orderRepository = new OrderRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const orderService = new OrderService(
		sctx.loggerService,
		orderRepository,
		sctx.eventPublisher
	)
	const orderController = new OrderController(orderService)

	const router = express.Router()

	router.use('/comment', OrderCommentModule(sctx))
	router.post('/', JwtMiddlewares.verifyToken, orderController.create as any)
	router.get(
		'/search',
		JwtMiddlewares.verifyToken,
		orderController.search as any
	)
	router.get(
		'/:orderId',
		JwtMiddlewares.verifyToken,
		orderController.getOne as any
	)
	return router
}

export default OrderModule
