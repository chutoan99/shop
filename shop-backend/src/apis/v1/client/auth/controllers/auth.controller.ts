import { Request, Response } from 'express'
import { validate, ValidationError } from 'class-validator'
import { plainToClass, plainToInstance } from 'class-transformer'
import {
	ForgotPasswordDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto
} from '../dtos'
import {
	AuthenticatedRequest,
	BaseErrors,
	CommandResponse,
	MESSAGE,
	STATUS_CODE
} from '@core/index'
import { IAuthService } from '../interfaces'
export default class AuthController {
	constructor(private readonly _authService: IAuthService) {}

	public register = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const payload: RegisterDto = plainToInstance(RegisterDto, req.body)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			await this._authService.register(payload)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.REGISTER.SUCCESS
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public login = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: LoginDto = plainToInstance(LoginDto, req.body)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response = await this._authService.login(payload)
			if ('refresh_token' in response) {
				// Set cookie for refresh token
				res.cookie('refreshToken', response.refresh_token, {
					httpOnly: true,
					maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
				})

				delete response.refresh_token
			}
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error: any) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public forgotPassword = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: ForgotPasswordDto = plainToInstance(
				ForgotPasswordDto,
				req.query
			)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response = await this._authService.forgotPassword(
				payload,
				+req.user.id!
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error: any) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public resetPassword = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: ResetPasswordDto = plainToInstance(
				ResetPasswordDto,
				req.body
			)

			const errors: ValidationError[] = await validate(payload)
			if (errors.length > 0)
				return BaseErrors.badRequest(errors[0].constraints, res)

			const response = await this._authService.resetPassword(payload)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error: any) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public refreshAccessToken = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const cookie = req.cookie
			if (!cookie && !cookie.refreshToken)
				throw new Error('No refresh token in cookies')
			const response = await this._authService.refreshAccessToken(cookie)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error: any) {
			return BaseErrors.internalServerError(res, error)
		}
	}

	public logout = async (
		req: AuthenticatedRequest,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const cookie = req.cookies
			if (!cookie || !cookie.refreshToken)
				throw new Error('No refresh token in cookies')
			const response = await this._authService.logout(cookie)
			res.clearCookie('refreshToken', {
				httpOnly: true,
				secure: true
			})
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(
				plainToClass(CommandResponse, {
					err: 0,
					msg: MESSAGE.LOGOUT.DONE
				})
			)
		} catch (error: any) {
			return BaseErrors.internalServerError(res, error)
		}
	}
}
