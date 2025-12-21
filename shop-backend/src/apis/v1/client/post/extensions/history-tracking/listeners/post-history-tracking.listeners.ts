import LoggerService from '@core/libs/logger/logger.system'
import { Builder } from 'builder-pattern'
import RedisService from '@core/libs/redis/redis.service'
import { IPostHistoryTrackingRepository } from '../interface'
import { CreatePostHistoryTrackingDto } from '../dto'
import PostHistoryTrackingEvent from '../events/post-history-tracking.event'
import { PostHistoryTrackingModel } from '../model'
import PostHistoryTrackingService from '../service/post-history-tracking.service'
import RedisPubSubService from '@core/libs/redis/redis-pub-sub.service'

export default class PostHistoryTrackingListeners {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _postHistoryTrackingRepository: IPostHistoryTrackingRepository
	) {}

	async execute(evt: PostHistoryTrackingEvent) {
		try {
			if (evt.payload.name) {
				const payload = Builder<CreatePostHistoryTrackingDto>()
					.text(evt.payload.name)
					.build()

				try {
					const newSearch = Builder<PostHistoryTrackingModel>()
						.user_id(evt.userId!)
						.text(payload.text)
						.build()

					const isCreated: boolean =
						await this._postHistoryTrackingRepository.create(
							newSearch
						)

					if (isCreated) {
						this._redisService.setCache(
							PostHistoryTrackingService.generateCacheKey(
								evt.userId!
							),
							null
						)
					}
				} catch (error: any) {
					this._loggerService.error(error)
					throw Error(error.message || error)
				}
			}
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	subscribe() {
		RedisPubSubService.getInstance().subscribe(
			PostHistoryTrackingEvent.EVENT,
			(msg: string) => {
				const data = JSON.parse(msg)
				const evt = PostHistoryTrackingEvent.from(data)
				this.execute(evt)
			}
		)
	}
}
