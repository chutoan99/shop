import express from 'express'
import ShopRepository from './repositories/shop.repository'
import ShopService from './services/shop.service'
import ShopController from './controllers/shop.controller'
import ShopMallModule from './extensions/mall/shop-mall.module'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const ShopModule = (sctx: ServiceContext) => {
	const shopMallRepository = new ShopRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const shopService = new ShopService(
		sctx.redisService,
		sctx.loggerService,
		shopMallRepository
	)
	const shopController = new ShopController(shopService)

	const router = express.Router()
	router.use('/mall', ShopMallModule(sctx))

	router.get(
		'/:shopId/posts',
		JwtMiddlewares.verifyToken,
		shopController.findItems as any
	)
	router.get(
		'/:shopId',
		JwtMiddlewares.verifyToken,
		shopController.find as any
	)

	return router
}

export default ShopModule
