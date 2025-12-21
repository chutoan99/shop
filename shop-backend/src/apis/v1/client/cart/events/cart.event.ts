import { AppEvent } from '@core/interfaces'

export default class CartEvent extends AppEvent<any> {
	static create(payload: any, userId: number) {
		return new CartEvent('delete-cart', payload, { userId })
	}

	static from(json: any) {
		const { eventName, payload, id, occurredAt, userId } = json
		return new CartEvent(eventName, payload, {
			id,
			occurredAt,
			userId
		})
	}
}
