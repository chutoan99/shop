import { AppEvent } from '@core/interfaces'
import { UpdateUserDto } from '@user/dtos'

export default class UserUpdatedEvent extends AppEvent<UpdateUserDto> {
	static EVENT = 'user-created'

	static create(payload: UpdateUserDto, userId: number) {
		return new UserUpdatedEvent(UserUpdatedEvent.EVENT, payload, {
			userId
		})
	}

	static from(json: any) {
		const { eventName, payload, id, occurredAt, userId } = json
		return new UserUpdatedEvent(eventName, payload, {
			id,
			occurredAt,
			userId
		})
	}
}
