import express from 'express'
import UploadController from './controller/upload.controller'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const UploadModule = (sctx: ServiceContext) => {
	const uploadController = new UploadController(sctx.cloudINaryService)

	const router = express.Router()

	router.post(
		'/images',
		JwtMiddlewares.verifyToken,
		uploadController.uploadSingle as any
	)
	router.get('/videos', JwtMiddlewares.verifyToken)

	return router
}

export default UploadModule
