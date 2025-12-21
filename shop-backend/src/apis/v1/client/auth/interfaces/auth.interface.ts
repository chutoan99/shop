import { CommandResponse } from '@core/interfaces'
import {
	ForgotPasswordDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto
} from '../dtos'
import { LoginResponse } from '../responses'
import { UserModel } from '../../user/models'

export interface IAuthService {
	register(payload: RegisterDto): Promise<boolean>
	login(payload: LoginDto): Promise<LoginResponse | CommandResponse>
	forgotPassword(payload: ForgotPasswordDto, userId: number): any
	resetPassword(payload: ResetPasswordDto): any
	refreshAccessToken(cookie: any): any
	logout(cookie: any): Promise<boolean>
}

export interface IAuthRepository {
	updateRefreshToken(user: UserModel, token: string): Promise<boolean>
	updateToken(email: string, token: string, expires: number): Promise<boolean>
	logout(userId: number): Promise<boolean>
	resetPassword(email: string, password: string): Promise<boolean>
	findUserRefreshAccessToken(
		userId: number,
		refreshToken: string
	): Promise<UserModel>
}
