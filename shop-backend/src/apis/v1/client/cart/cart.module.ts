import express from 'express'
import CartRepository from './repositories/cart.repository'
import CartService from './services/cart.service'
import CartController from './controllers/cart.controller'
import { CartConsumer } from './consumers'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const CartModule = (sctx: ServiceContext) => {
	const cartRepository = new CartRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const cartService = new CartService(sctx.loggerService, cartRepository)
	const cartController = new CartController(cartService)

	const router = express.Router()

	router.get('/', JwtMiddlewares.verifyToken, cartController.findAll as any)
	router.post('/', JwtMiddlewares.verifyToken, cartController.create as any)
	router.put(
		'/:cartId',
		JwtMiddlewares.verifyToken,
		cartController.update as any
	)
	router.delete(
		'/:cartId',
		JwtMiddlewares.verifyToken,
		cartController.delete as any
	)

	CartConsumer(sctx)

	return router
}

export default CartModule
