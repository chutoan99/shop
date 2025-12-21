import express from 'express'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'
import PostLikeRepository from './repository/post-like.repository'
import PostLikeService from './service/post-like.service'
import PostLikeController from './controller/pots-like.controller'

const PostLikeModule = (sctx: ServiceContext) => {
	const postLikeRepository = new PostLikeRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const postLikeService = new PostLikeService(
		sctx.loggerService,
		postLikeRepository
	)

	const postLikeController = new PostLikeController(
		sctx.loggerService,
		postLikeService
	)

	const router = express.Router()

	router.get(
		'/',
		JwtMiddlewares.verifyToken,
		postLikeController.findAll as any
	)
	router.post(
		'/',
		JwtMiddlewares.verifyToken,
		postLikeController.create as any
	)
	router.delete(
		'/:id',
		JwtMiddlewares.verifyToken,
		postLikeController.delete as any
	)

	return router
}

export default PostLikeModule
