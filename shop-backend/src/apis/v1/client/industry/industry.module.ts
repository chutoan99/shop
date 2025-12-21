import express from 'express'
import IndustryRepository from './repository/industry.repository'
import IndustryService from './service/industry.service'
import IndustryController from './controller/industry.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'
import IndustryCategoryTreeModule from './extensions/category-tree/industry-category-tree.module'

const IndustryModule = (sctx: ServiceContext) => {
	const categoriesTreeRepository = new IndustryRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const industryService = new IndustryService(
		sctx.redisService,
		sctx.loggerService,
		categoriesTreeRepository
	)
	const industryController = new IndustryController(industryService)

	const router = express.Router()
	router.use('/category-tree', IndustryCategoryTreeModule(sctx))
	router.get(
		'/',
		JwtMiddlewares.verifyToken,
		industryController.findAll as any
	)
	router.get(
		'/category',
		JwtMiddlewares.verifyToken,
		industryController.search
	)
	return router
}

export default IndustryModule
