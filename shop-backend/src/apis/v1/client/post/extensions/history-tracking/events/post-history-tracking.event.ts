import { AppEvent } from '@core/interfaces'
import SearchPostDto from '../../../dtos/search-post.dto'

export default class PostHistoryTrackingEvent extends AppEvent<SearchPostDto> {
	static EVENT = 'post-history-tracking'

	static create(payload: SearchPostDto, userId: number) {
		return new PostHistoryTrackingEvent(
			PostHistoryTrackingEvent.EVENT,
			payload,
			{
				userId
			}
		)
	}

	static from(json: any) {
		const { eventName, payload, id, occurredAt, userId } = json
		return new PostHistoryTrackingEvent(eventName, payload, {
			id,
			occurredAt,
			userId
		})
	}
}
