import { ErrorHelper } from '@core/errors/error-code.enum'
import LoggerService from '@core/libs/logger/logger.system'
import { IUserRepository } from '@user/interfaces/user.interface'
import { UserModel } from '@user/models'
import { plainToClass } from 'class-transformer'

export class UserValidator {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _userRepository: IUserRepository
	) {}

	public existUser = async (email: string) => {
		try {
			const existingUser: UserModel =
				await this._userRepository.findByEmail(email)

			console.log('existingUser', existingUser)

			if (existingUser) {
				throw new Error(
					ErrorHelper.getErrorMessage('user:is-ready-exists')
				)
			}
		} catch (error: any) {
			this._loggerService.error(email, error.message || error)
			throw Error(error.message || error)
		}
	}

	public async notFound(param: {
		email?: string
		id?: number
	}): Promise<void> {
		try {
			let existingUser: UserModel | undefined

			if (param.email) {
				existingUser = await this._userRepository.findByEmail(
					param.email
				)
			}

			if (param.id) {
				existingUser = await this._userRepository.findByID(param.id)
			}

			if (!existingUser) {
				throw new Error(ErrorHelper.getErrorMessage('user:not-found'))
			}
		} catch (error: any) {
			this._loggerService.error(error.message || error)
			throw Error(error.message || error)
		}
	}
}
