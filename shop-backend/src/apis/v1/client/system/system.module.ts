import express from 'express'
import { ServiceContext } from 'src/server'
import BannerRepository from './repositories/banner.repository'
import BannerService from './services/banner.service'
import BannerController from './controllers/banner.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import BatchListRepository from './repositories/batch-list.repository'
import BatchListService from './services/batch-list.service'
import BatchListController from './controllers/batch-list.controller'
import FlashSaleRepository from './repositories/flash-sale.repository'
import FlashSaleService from './services/flash-sale.service'
import FlashSaleController from './controllers/flash-sale.controller'
import SuggestSearchController from './controllers/suggest-search.controller'
import SuggestSearchService from './services/suggest-search.service'
import SuggestSearchRepository from './repositories/suggest-search.repository'

const SysTemModule = (sctx: ServiceContext) => {
	const router = express.Router()

	const bannerRepository = new BannerRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const bannerService = new BannerService(
		sctx.loggerService,
		sctx.redisService,
		bannerRepository
	)
	const bannerController = new BannerController(bannerService)

	const batchListRepository = new BatchListRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const batchListService = new BatchListService(
		sctx.loggerService,
		sctx.redisService,
		batchListRepository
	)

	const batchListController = new BatchListController(batchListService)

	const flashSaleRepository = new FlashSaleRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const flashSaleService = new FlashSaleService(
		sctx.loggerService,
		sctx.redisService,
		flashSaleRepository
	)

	const flashSaleController = new FlashSaleController(flashSaleService)

	const suggestSearchRepository = new SuggestSearchRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const suggestSearchService = new SuggestSearchService(
		sctx.loggerService,
		sctx.redisService,
		suggestSearchRepository
	)

	const suggestSearchController = new SuggestSearchController(
		suggestSearchService
	)

	router.get(
		'/banner',
		JwtMiddlewares.verifyToken,
		bannerController.findAll as any
	)
	router.get(
		'/batch-list',
		JwtMiddlewares.verifyToken,
		batchListController.findAll as any
	)

	router.get(
		'/flash-sale',
		JwtMiddlewares.verifyToken,
		flashSaleController.findAll as any
	)
	router.get(
		'/suggest-search',
		JwtMiddlewares.verifyToken,
		suggestSearchController.findAll as any
	)

	return router
}

export default SysTemModule
