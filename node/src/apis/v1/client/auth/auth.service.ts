import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt, { JwtPayload } from 'jsonwebtoken'
import sendEmail from '~/middleWares/sendEmail'
import templateResetPassword from '~/templates/reset'
import { generateAccessToken, generateRefreshToken } from '~/middleWares/jwt'
import MESSAGE from '~/@core/contains/message.json'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import UserRepository from '../user/user.repository'
import UserService from '../user/user.service'
import { generateShopId, generateUserId } from '~/helpers/generateId'
import { ROLE } from '~/systems/other/role.interface'
import AuthRepository from './auth.repository'
import {
	ForgotPasswordDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto
} from './auth.dto'
import { BaseResponse } from '~/systems/other/response.system'
import { loginResponse } from './auth.response'
import { UserModel } from '../user/user.model'
import { LoggerSystem } from '~/systems/logger'
interface IAuthService {
	register(payload: RegisterDto): Promise<BaseResponse>
	login(payload: LoginDto): Promise<loginResponse | BaseResponse>
	forgotPassword(payload: ForgotPasswordDto): any
	resetPassword(payload: ResetPasswordDto): any
	refreshAccessToken(cookie: any): any
	logout(cookie: any): any
}

export default class AuthService implements IAuthService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _userRepository: UserRepository
	private readonly _authRepository: AuthRepository
	private readonly _userService: UserService

	constructor() {
		this._userService = new UserService()
		this._userRepository = new UserRepository()
		this._authRepository = new AuthRepository()
		this._loggerSystem = new LoggerSystem()
	}

	//* B1: Kiểm tra email đã tồn tại hay chưa
	//* B2: Tạo User
	public register = async (payload: RegisterDto): Promise<BaseResponse> => {
		try {
			const checkResult = await this._userService.checkExistUser(
				payload.email
			)
			if (checkResult) {
				return checkResult
			}
			const user: UserModel = Builder<UserModel>()
				.id(generateUserId())
				.shopid(generateShopId())
				.email(payload?.email)
				.name(payload?.name)
				.sex(0)
				.phone(0)
				.role(ROLE.CLIENT)
				.password(this._hashPassWord(payload?.password))
				.build()

			const created: boolean = await this._userRepository.create(user)

			if (!created) {
				return {
					err: 1,
					msg: MESSAGE.REGISTER.FAILED
				}
			}

			return {
				err: 0,
				msg: MESSAGE.REGISTER.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1 KIỂM TRA MẬT KHẨU ĐÚNG HAY KHÔNG
	//* B2 TẠO ACCESS_TOKEN (Xác thực người dùng, quân quyên người dùng) VÀ REFRESH_TOKEN()
	//* B3 LƯU REFRESH_TOKEN VÀO DB VÀ COOKIE
	public login = async (
		payload: LoginDto
	): Promise<loginResponse | BaseResponse> => {
		try {
			const user: UserModel = await this._userRepository.findByEmail(
				payload?.email
			)

      console.log(user,"csscscsc")

			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const isHashedPassword = bcrypt.compareSync(
				payload?.password.toString(),
				user.password.toString()
			)

			if (isHashedPassword) {
				const accessToken: string = generateAccessToken({
					userid: user.id,
					email: user.email,
					role: user.role
				})
				const newRefreshToken: string = generateRefreshToken({
					userid: user.id,
					email: user.email
				})

				await this._authRepository.updateRefreshToken(
					user,
					newRefreshToken
				)

				return {
					err: 0,
					msg: MESSAGE.LOGIN.SUCCESS,
					access_token: accessToken,
					refresh_token: newRefreshToken
				}
			} else {
				return {
					err: 2,
					msg: MESSAGE.EMAIL.WRONG_CREDENTIALS
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1: Client gửi email
	//* B2: Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
	//* B3: Client check mail => click link
	//* B4: Client gửi api kèm token
	//* B5: Check token có giống với token mà server gửi mail hay không
	//* B6: Change password
	public forgotPassword = async (payload: ForgotPasswordDto) => {
		try {
			const user: UserModel = await this._userRepository.findByEmail(
				payload?.email
			)
			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}
			const resetToken: string = crypto.randomBytes(32).toString('hex')
			const passwordResetExpires: number = Date.now() + 15 * 60 * 1000
			const passwordResetToken = crypto
				.createHash('sha256')
				.update(resetToken)
				.digest('hex')

			const idUpdated: boolean = await this._authRepository.updateToken(
				user.email,
				passwordResetToken,
				passwordResetExpires
			)

			if (idUpdated) {
				const result: any = await sendEmail(
					user?.email,
					templateResetPassword(user?.email, resetToken)
				)
				return {
					err: result ? 0 : 2,
					msg: 'ok',
					response: result ? result : null
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1: Check thời gian token còn hạn hay không
	//* B2: Kiểm tra thời gian lưu trong db và thời gian thực xem tojen có hết hạn hay chưa
	public resetPassword = async (payload: ResetPasswordDto) => {
		try {
			const user: UserModel = await this._userRepository.findByEmail(
				payload?.email
			)
			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const passwordResetToken = crypto
				.createHash('sha256')
				.update(payload?.token)
				.digest('hex')

			if ((user.passwordResetExpires as any) - Date.now() <= 0) {
				return {
					err: 2,
					msg: MESSAGE.TOKEN.EXPIRE
				}
			}

			const newPassword = this._hashPassWord(payload?.password)

			const idUpdated: boolean = await this._authRepository.resetPassword(
				payload?.email,
				newPassword
			)

			if (!idUpdated) {
				return {
					err: 2,
					msg: MESSAGE.EMAIL.WRONG_CREDENTIALS
				}
			}

			return {
				err: 0,
				msg: MESSAGE.USER.UPDATED_PASSWORD_SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1: Check xem có token hay không
	//* B2: Check refreshToken và trong db có giống nhau hay không, nếu giống thì tạo newAccessToken
	public refreshAccessToken = async (cookie: any) => {
		const decode = jwt.verify(
			cookie.refreshToken,
			process.env.SECRET_KEY as jwt.Secret
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
		const newAccessToken: string = generateAccessToken({
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

	public logout = async (cookie: any) => {
		try {
			//* Xóa refresh token ở db
			const decode = jwt.verify(
				cookie.refreshToken,
				process.env.SECRET_KEY as jwt.Secret
			) as JwtPayload
			const isLoggedOut: boolean = await this._authRepository.logout(
				decode?.userid
			)

			if (isLoggedOut) {
				return {
					err: 0,
					msg: MESSAGE.LOGOUT.DONE
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	private _hashPassWord = (password: string): string => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
	}
}
