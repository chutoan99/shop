import express from 'express'
import IndustryCategoryTreeService from './service/industry-category-tree.service'
import IndustryCategoryTreeController from './controller/industry-category-tree.controller'
import IndustryCategoryTreeRepository from './repository/industry-category-tree.repository'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const IndustryCategoryTreeModule = (sctx: ServiceContext) => {
	const industryCategoryTreeRepository = new IndustryCategoryTreeRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const industryCategoryTreeService = new IndustryCategoryTreeService(
		sctx.loggerService,
		sctx.redisService,
		industryCategoryTreeRepository
	)
	const industryCategoryTreeController = new IndustryCategoryTreeController(
		industryCategoryTreeService
	)

	const router = express.Router()

	router.get(
		'/',
		JwtMiddlewares.verifyToken,
		industryCategoryTreeController.search as any
	)

	return router
}

export default IndustryCategoryTreeModule
