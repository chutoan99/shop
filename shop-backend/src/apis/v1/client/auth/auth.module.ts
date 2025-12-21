import passport from 'passport'
import { Router } from 'express'
import AuthRepository from './repositories/auth.repository'
import UserRepository from '../user/repositories/user.repository'
import UserService from '../user/services/user.service'
import AuthService from './services/auth.service'
import AuthController from './controllers/auth.controller'
import express from 'express'
import { ForgotPasswordConsumer } from './consumers'
import { ServiceContext } from 'src/server'
import { JwtMiddlewares } from '@middlewares/jwt.middleware'
import { UserValidator } from '@user/validators'

const AuthModule = (sctx: ServiceContext) => {
	const authRepository = new AuthRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const userRepository = new UserRepository(
		sctx.loggerService,
		sctx.mySQLService
	)
	const userValidator = new UserValidator(sctx.loggerService, userRepository)

	const authService = new AuthService(
		sctx.loggerService,
		sctx.eventPublisher,
		userRepository,
		authRepository,
		userValidator
	)
	const authController = new AuthController(authService)

	const router: Router = express.Router()

	router.post('/register', authController.register as any)
	router.post('/login', authController.login as any)
	router.post(
		'/forgotPassword',
		JwtMiddlewares.verifyToken,
		authController.forgotPassword as any
	)
	router.put('/resetPassword', authController.resetPassword as any)
	router.post('/refreshToken', authController.refreshAccessToken as any)
	router.get('/logout', authController.logout as any)
	router.get(
		'/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	)
	router.get('/google/callback', passport.authenticate('google'))
	router.get('/facebook', passport.authenticate('facebook'))
	router.get(
		'/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/login'
		})
	)

	ForgotPasswordConsumer(sctx)

	return router
}

export default AuthModule
