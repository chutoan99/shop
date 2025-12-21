import express from 'express'
import PostTopProductRepository from './repository/post-top-product.repository'
import PostTopProductService from './service/post-top-product.service'
import PostTopProductController from './controller/post-top-product.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const PostTopProductModule = (sctx: ServiceContext) => {
	const postTopProductRepository = new PostTopProductRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const postTopProductService = new PostTopProductService(
		sctx.loggerService,
		sctx.redisService,
		postTopProductRepository
	)
	const postTopProductController = new PostTopProductController(
		postTopProductService
	)

	const router = express.Router()

	router.get(
		'/',
		JwtMiddlewares.verifyToken,
		postTopProductController.findAll as any
	)

	return router
}

export default PostTopProductModule
