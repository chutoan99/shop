import LoggerService from '@core/libs/logger/logger.system'
import { Builder } from 'builder-pattern'
import RedisService from '@core/libs/redis/redis.service'
import { IUserRepository } from '@user/interfaces/user.interface'
import UserUpdatedEvent from '@user/events/user-updated.event'
import RedisPubSubService from '@core/libs/redis/redis-pub-sub.service'

export default class UserHandlerListeners {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _userRepository: IUserRepository
	) {}

	async execute(evt: UserUpdatedEvent) {
		try {
			console.log('cscs')
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	subscribe() {
		RedisPubSubService.getInstance().subscribe(
			UserUpdatedEvent.EVENT,
			(msg: string) => {
				const data = JSON.parse(msg)
				const evt = UserUpdatedEvent.from(data)
				this.execute(evt)
			}
		)
	}
}
