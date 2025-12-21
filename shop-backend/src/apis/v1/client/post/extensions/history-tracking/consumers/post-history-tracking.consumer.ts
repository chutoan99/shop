import { ServiceContext } from 'src/server'
import PostHistoryTrackingRepository from '../repository/post-history-tracking.repository'
import PostHistoryTrackingListeners from '../listeners/post-history-tracking.listeners'

export const PostHistoryTrackingConsumer = (sctx: ServiceContext) => {
	const postHistoryTrackingRepository = new PostHistoryTrackingRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	new PostHistoryTrackingListeners(
		sctx.loggerService,
		sctx.redisService,
		postHistoryTrackingRepository
	).subscribe()
}

export default PostHistoryTrackingConsumer
