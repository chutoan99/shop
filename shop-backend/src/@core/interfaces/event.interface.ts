export type EventHandler = (msg: string) => void

export interface IEventPublisher {
	publish<T>(event: AppEvent<T>): Promise<void>
	subscribe(topic: string, fn: (message: string) => void): Promise<void>
}

export class AppEvent<Payload> {
	private _id: string
	private _occurredAt: Date
	private _userId?: number

	constructor(
		private readonly _eventName: string,
		private readonly _payload: Payload,
		dtoProps?: {
			id?: string
			occurredAt?: Date
			userId?: number
		}
	) {
		this._id = dtoProps?.id || ''
		this._occurredAt = dtoProps?.occurredAt ?? new Date()
		this._userId = dtoProps?.userId
	}

	get eventName(): string {
		return this._eventName
	}

	get id(): string {
		return this._id
	}

	get occurredAt(): Date {
		return this._occurredAt
	}

	get userId(): number | undefined {
		return this._userId
	}

	get payload(): Payload {
		return this._payload
	}

	plainObject() {
		return {
			id: this._id,
			occurredAt: this._occurredAt,
			userId: this._userId,
			eventName: this._eventName,
			payload: this._payload
		}
	}
}
