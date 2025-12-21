import { MESSAGE } from '@core/resources'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Builder } from 'builder-pattern'
import { CommandResponse, IEventPublisher } from '@core/interfaces'
import { generateShopId, generateUserId } from '@helpers/generateId.helper'
import { ROLE } from '@core/enums'
import { plainToClass } from 'class-transformer'
import {
	ForgotPasswordDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto
} from '../dtos'
import { LoginResponse } from '../responses'
import EnvConfig from '@configs/env.config'
import { IAuthRepository, IAuthService } from '../interfaces'

import ForgotPasswordEvent, {
	ForgotPasswordEventDto
} from '../events/forgot-password.event'
import { JwtService } from '@core/libs/jwt'
import LoggerService from '@core/libs/logger/logger.system'
import { IUserRepository, UserModel, UserValidator } from '@auth/imports'
import RedisPubSubService from '@core/libs/redis/redis-pub-sub.service'

export default class AuthService implements IAuthService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _eventPublisher: RedisPubSubService,
		private readonly _userRepository: IUserRepository,
		private readonly _authRepository: IAuthRepository,
		private readonly _userValidator: UserValidator
	) {}

	//* B1: Kiểm tra email đã tồn tại hay chưa
	//* B2: Tạo User
	public register = async (payload: RegisterDto): Promise<boolean> => {
		try {
			await this._userValidator.existUser(payload.email)

			const user: UserModel = Builder<UserModel>()
				.id(generateUserId())
				.shop_id(generateShopId())
				.username(payload?.email?.split('@')[0])
				.email(payload?.email)
				.name(payload?.name)
				.sex(0)
				.phone(0)
				.role(ROLE.CLIENT)
				.password(this._hashPassWord(payload?.password))
				.created_at(new Date())
				.build()

			const created: boolean = await this._userRepository.create(user)

			if (!created) {
				throw new Error(MESSAGE.REGISTER.FAILED)
			}

			return created
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	//* B1 KIỂM TRA MẬT KHẨU ĐÚNG HAY KHÔNG
	//* B2 TẠO ACCESS_TOKEN (Xác thực người dùng, quân quyên người dùng) VÀ REFRESH_TOKEN()
	//* B3 LƯU REFRESH_TOKEN VÀO DB VÀ COOKIE
	public login = async (
		payload: LoginDto
	): Promise<LoginResponse | CommandResponse> => {
		try {
			await this._userValidator.notFound({ email: payload.email })

			const user: UserModel = await this._userRepository.findByEmail(
				payload?.email
			)

			const isHashedPassword = bcrypt.compareSync(
				payload?.password.toString(),
				user.password.toString()
			)

			if (isHashedPassword) {
				const accessToken: string = JwtService.generateAccessToken({
					userid: user.id,
					email: user.email,
					role: user.role
				})
				const newRefreshToken: string = JwtService.generateRefreshToken(
					{
						userid: user.id,
						email: user.email
					}
				)

				await this._authRepository.updateRefreshToken(
					user,
					newRefreshToken
				)

				return plainToClass(
					LoginResponse,
					{
						err: 0,
						msg: MESSAGE.LOGIN.SUCCESS,
						access_token: accessToken,
						refresh_token: newRefreshToken
					},
					{ excludeExtraneousValues: true }
				)
			} else {
				return {
					err: 2,
					msg: MESSAGE.EMAIL.WRONG_CREDENTIALS
				}
			}
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	//* B1: Client gửi email
	//* B2: Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
	//* B3: Client check mail => click link
	//* B4: Client gửi api kèm token
	//* B5: Check token có giống với token mà server gửi mail hay không
	//* B6: Change password
	public forgotPassword = async (
		payload: ForgotPasswordDto,
		userId: number
	) => {
		try {
			await this._userValidator.notFound({ email: payload.email })

			const resetToken: string = crypto.randomBytes(32).toString('hex')
			const passwordResetExpires: number = Date.now() + 15 * 60 * 1000
			const passwordResetToken = crypto
				.createHash('sha256')
				.update(resetToken)
				.digest('hex')

			const idUpdated: boolean = await this._authRepository.updateToken(
				payload.email,
				passwordResetToken,
				passwordResetExpires
			)

			if (idUpdated) {
				const payloadEvent: ForgotPasswordEventDto = {
					email: payload.email,
					token: resetToken
				}

				this._eventPublisher.publish(
					ForgotPasswordEvent.create({ ...payloadEvent }, userId)
				)
			}

			return {
				err: 0,
				msg: 'ok'
			}
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	//* B1: Check thời gian token còn hạn hay không
	//* B2: Kiểm tra thời gian lưu trong db và thời gian thực xem tojen có hết hạn hay chưa
	public resetPassword = async (payload: ResetPasswordDto) => {
		try {
			await this._userValidator.notFound({ email: payload.email })

			const user: UserModel = await this._userRepository.findByEmail(
				payload?.email
			)

			const passwordResetToken = crypto
				.createHash('sha256')
				.update(payload?.token)
				.digest('hex')

			if ((user.password_reset_expires as any) - Date.now() <= 0) {
				return {
					err: 2,
					msg: MESSAGE.TOKEN.EXPIRE
				}
			}

			const idUpdated: boolean = await this._authRepository.resetPassword(
				payload?.email,
				this._hashPassWord(payload?.password)
			)

			return idUpdated
				? { err: 0, msg: MESSAGE.USER.UPDATED_PASSWORD_SUCCESS }
				: { err: 2, msg: MESSAGE.EMAIL.WRONG_CREDENTIALS }
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	//* B1: Check xem có token hay không
	//* B2: Check refreshToken và trong db có giống nhau hay không, nếu giống thì tạo newAccessToken
	public refreshAccessToken = async (cookie: any) => {
		const decode = jwt.verify(
			cookie.refreshToken,
			EnvConfig.app.secretKey as jwt.Secret
		) as JwtPayload

		const user: UserModel =
			await this._authRepository.findUserRefreshAccessToken(
				decode?.userid,
				cookie.refreshToken
			)

		if (!user) {
			return {
				err: 2,
				msg: MESSAGE.USER.NOT_FOUND
			}
		}
		const newAccessToken: string = JwtService.generateAccessToken({
			userid: user.id,
			email: user.email,
			role: user.role
		})

		return {
			err: 0,
			msg: MESSAGE.TOKEN.CREATED,
			accessToken: newAccessToken
		}
	}

	public logout = async (cookie: any): Promise<boolean> => {
		try {
			//* Xóa refresh token ở db
			const decode = jwt.verify(
				cookie.refreshToken,
				EnvConfig.app.secretKey as jwt.Secret
			) as JwtPayload

			const isLoggedOut: boolean = await this._authRepository.logout(
				decode?.userid
			)

			if (!isLoggedOut) {
				throw new Error(MESSAGE.LOGOUT.FAILED)
			}

			return isLoggedOut
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	private _hashPassWord = (password: string): string => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
	}
}
