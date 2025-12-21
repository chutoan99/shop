import LoggerService from '@core/libs/logger/logger.system'
import { MESSAGE } from '@core/resources'
import { UpdateUserDto } from '../dtos'
import { plainToClass } from 'class-transformer'
import { UserModel } from '../models'
import { IUserRepository, IUserService } from '../interfaces/user.interface'
import RedisService from '@core/libs/redis/redis.service'
import { UserValidator } from '@user/validators/user.validator'

export default class UserService implements IUserService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _userValidator: UserValidator,
		private readonly _userRepository: IUserRepository
	) {}

	public findUser = async (id: number): Promise<UserModel> => {
		try {
			const cacheKey: string = `user-${id}`
			await this._userValidator.notFound({ id })
			await this._checkCache(cacheKey)

			const currentUser: UserModel = await this._userRepository.findByID(
				id
			)

			if (!currentUser) {
				throw new Error(MESSAGE.USER.NOT_FOUND)
			}

			this._redisService.setCache(cacheKey, currentUser)

			return currentUser
		} catch (error: any) {
			this._loggerService.error(error.message || error)
			throw Error(error.message || error)
		}
	}

	public updateUser = async (
		email: string,
		payload: UpdateUserDto
	): Promise<void> => {
		try {
			const cacheKey: string = `user-${payload.id}`
			await this._userValidator.notFound({ email })

			const idUpdated: boolean = await this._userRepository.update(
				payload
			)

			if (!idUpdated) {
				throw new Error(MESSAGE.UPDATE.FAIL)
			}

			this._redisService.setCache(cacheKey, null)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	private async _checkCache(cacheKey: string) {
		return await this._redisService.getCache(cacheKey)
	}
}
