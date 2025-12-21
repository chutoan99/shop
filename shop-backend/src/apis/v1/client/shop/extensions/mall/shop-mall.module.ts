import express from 'express'
import ShopMallRepository from './repository/shop-mall.repository'
import ShopMallService from './service/shop-mall.service'
import ShopMallController from './controller/shop-mall.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const ShopMallModule = (sctx: ServiceContext) => {
	const shopMallRepository = new ShopMallRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const shopMallService = new ShopMallService(
		sctx.redisService,
		sctx.loggerService,
		shopMallRepository
	)
	const shopMallController = new ShopMallController(shopMallService)

	const router = express.Router()

	router.get(
		'/',
		JwtMiddlewares.verifyToken,
		shopMallController.findAll as any
	)

	return router
}

export default ShopMallModule
