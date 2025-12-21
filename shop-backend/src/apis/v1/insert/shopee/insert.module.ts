import InsertControllers from './insert.controller'
import express from 'express'
import InsertBannerService from './service/insert-banner.service'
import InsertShopMallService from './service/insert-shop-mall.service'
import InsertCategoryService from './service/insert-category.service'
import InsertNotifyService from './service/insert-notify.service'
import InsertSuggestSearchService from './service/insert-suggest-search.service'
import InsertBatchListService from './service/insert-batch-list.service'
import InsertVideoService from './service/insert-video.service'
import InsertDiscountService from './service/insert-discount.service'
import InsertVoucherService from './service/insert-voucher.service'
import InsertPostService from './service/insert-post.service'
import InsertShopService from './service/insert-shop.service'
import InsertCommentService from './service/insert-comment.service'
import InsertFlashSaleService from './service/insert-flash-sale.service'
import InsertIndustryService from './service/insert-industry.service'
import InsertTopProductService from './service/insert-top-product.service'
import InsertUserService from './service/insert-user.service'
import InsertProductService from './service/insert-product.service'
import { ServiceContext } from 'src/server'
import {
	InsertBannerConsumer,
	InsertBatchListConsumer,
	InsertCategoryConsumer,
	InsertCommentConsumer,
	InsertDiscountConsumer,
	InsertFlashSaleConsumer,
	InsertIndustryConsumer,
	InsertPostConsumer,
	InsertShopConsumer,
	InsertShopMallConsumer,
	InsertSuggestSearchConsumer,
	InsertTopProductConsumer,
	InsertUserConsumer,
	InsertVideoConsumer,
	InsertVoucherConsumer
} from './consumer'

const InsertModule = (sctx: ServiceContext) => {
	const mySql = sctx.mySQLService
	const logger = sctx.loggerService
	const rabbitMq = sctx.rabbitMqService
	// const ecSearch = sctx.elasticSearchService
	const insertVideoService = new InsertVideoService(logger, rabbitMq)
	const insertDiscountService = new InsertDiscountService(logger, rabbitMq)
	const insertVoucherService = new InsertVoucherService(logger, rabbitMq)
	const insertPostService = new InsertPostService(logger, rabbitMq)
	const insertShopService = new InsertShopService(logger, rabbitMq)
	const insertBannerService = new InsertBannerService(logger, rabbitMq)
	const insertCommentService = new InsertCommentService(logger, rabbitMq)
	const insertShopMallService = new InsertShopMallService(logger, rabbitMq)
	const insertFlashSaleService = new InsertFlashSaleService(logger, rabbitMq)
	const insertIndustryService = new InsertIndustryService(logger, rabbitMq)
	const insertCategoryService = new InsertCategoryService(logger, rabbitMq)
	const insertNotifyService = new InsertNotifyService(logger, rabbitMq)
	const insertTopProductService = new InsertTopProductService(
		logger,
		rabbitMq
	)
	const insertSuggestSearchService = new InsertSuggestSearchService(
		logger,
		rabbitMq
	)
	const insertBatchListService = new InsertBatchListService(logger, rabbitMq)
	const insertUserService = new InsertUserService(logger, rabbitMq)
	const productService = new InsertProductService(
		logger,
		insertVideoService,
		insertDiscountService,
		insertVoucherService,
		insertPostService
	)

	const insertControllers = new InsertControllers(
		insertShopService,
		insertBannerService,
		productService,
		insertCommentService,
		insertShopMallService,
		insertFlashSaleService,
		insertIndustryService,
		insertCategoryService,
		insertNotifyService,
		insertTopProductService,
		insertSuggestSearchService,
		insertBatchListService,
		insertUserService,
		logger,
		mySql
	)

	new InsertBannerConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertBatchListConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertCommentConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertCategoryConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertDiscountConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertFlashSaleConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertIndustryConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertShopMallConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertPostConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertShopConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertSuggestSearchConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertTopProductConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertUserConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertVideoConsumer(logger, mySql, rabbitMq).startConsumer()
	new InsertVoucherConsumer(logger, mySql, rabbitMq).startConsumer()

	const router = express.Router()

	router.post('/apps', insertControllers.App)
	router.post('/reverts', insertControllers.RevertData)

	return router
}

export default InsertModule
