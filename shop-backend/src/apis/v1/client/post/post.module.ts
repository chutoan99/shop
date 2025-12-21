import express from 'express'
import PostService from './services/post.service'
import PostRepository from './repositories/post.repository'
import PostController from './controllers/post.controller'

import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

import PostLikeModule from './extensions/like/post-like.module'
import PostTopProductModule from './extensions/top-product/post-top-product.module'
import PostCommentModule from './extensions/comment/post-comment.module'
import PostHistoryTrackingModule from './extensions/history-tracking/post-history-tracking.module'
import { PermissionContainerService } from '@core/libs/access-control-list/services/permission-container.service'
import { permissions } from './consts/permission'

const PostModule = (sctx: ServiceContext) => {
	const postRepository = new PostRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const postService = new PostService(
		sctx.loggerService,
		postRepository,
		sctx.eventPublisher
	)

	const postController = new PostController(postService)

	const router = express.Router()
	router.use('/history-search', PostHistoryTrackingModule(sctx))
	router.use('/like', PostLikeModule(sctx))
	router.use('/top-product', PostTopProductModule(sctx))
	router.use('/comment', PostCommentModule(sctx))

	router.get(
		'/search',
		JwtMiddlewares.verifyToken,
		postController.search as any
	)
	router.get(
		'/:itemId',
		JwtMiddlewares.verifyToken,
		postController.find as any
	)

	PermissionContainerService.register(permissions, 'POST')

	return router
}

export default PostModule
