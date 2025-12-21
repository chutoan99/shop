import express from 'express'
import ShopRepository from '../shop/repositories/shop.repository'
import RoomService from './services/room.service'
import RoomController from './controllers/room.controller'
import ChatService from './services/chat.service'
import UserRepository from '../user/repositories/user.repository'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { ServiceContext } from 'src/server'

const ChatModule = (sctx: ServiceContext) => {
	const shopRepository = new ShopRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const userRepository = new UserRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	const chatService = new ChatService()

	const roomService = new RoomService(
		sctx.loggerService,
		sctx.redisService,
		shopRepository,
		userRepository,
		chatService
	)
	const roomController = new RoomController(roomService)

	const router = express.Router()

	router.get(
		'/room',
		JwtMiddlewares.verifyToken,
		roomController.findAll as any
	)
	router.get(
		'/room/:roomId/mess',
		JwtMiddlewares.verifyToken,
		roomController.findOne as any
	)
	router.post(
		'/room',
		JwtMiddlewares.verifyToken,
		roomController.create as any
	)

	router.get('/group', JwtMiddlewares.verifyToken)
	router.post('/group', JwtMiddlewares.verifyToken)
	router.get('/group/:groupId', JwtMiddlewares.verifyToken)
	router.put('/group/:groupId', JwtMiddlewares.verifyToken)
	router.delete('/group/:groupId', JwtMiddlewares.verifyToken)
	router.post('/group/inviteUser', JwtMiddlewares.verifyToken)

	return router
}

export default ChatModule
