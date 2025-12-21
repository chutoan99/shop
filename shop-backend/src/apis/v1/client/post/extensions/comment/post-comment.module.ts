import express from 'express'
import CommentRepository from './repository/post-comment.repository'
import CommentService from './service/post-comment.service'
import CommentController from './controller/post-comment.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const PostCommentModule = (sctx: ServiceContext) => {
	const commentRepository = new CommentRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const commentService = new CommentService(
		sctx.loggerService,
		commentRepository
	)

	const commentController = new CommentController(commentService)

	const router = express.Router()

	router.get('/', JwtMiddlewares.verifyToken, commentController.getAll as any)

	return router
}

export default PostCommentModule
