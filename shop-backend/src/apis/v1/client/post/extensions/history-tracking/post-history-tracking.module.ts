import express from 'express'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'
import { PostHistoryTrackingConsumer } from './consumers'
import PostHistoryTrackingController from './controller/post-history-tracking.controller'
import PostHistoryTrackingRepository from './repository/post-history-tracking.repository'
import PostHistoryTrackingService from './service/post-history-tracking.service'

const PostHistoryTrackingModule = (sctx: ServiceContext) => {
	PostHistoryTrackingConsumer(sctx)

	const postHistoryTrackingRepository = new PostHistoryTrackingRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const postHistoryTrackingService = new PostHistoryTrackingService(
		sctx.loggerService,
		sctx.redisService,
		postHistoryTrackingRepository
	)

	const postHistoryTrackingController = new PostHistoryTrackingController(
		postHistoryTrackingService
	)

	const router = express.Router()
	router.get(
		'/',
		JwtMiddlewares.verifyToken,
		postHistoryTrackingController.findAll as any
	)

	return router
}

export default PostHistoryTrackingModule
