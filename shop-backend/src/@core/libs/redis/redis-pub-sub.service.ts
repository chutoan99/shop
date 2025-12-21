import { AppEvent } from '@core/interfaces'
import Redis from 'ioredis'

export default class RedisPubSubService {
	private static instance: RedisPubSubService
	private publisher: Redis
	private subscriber: Redis

	private constructor(private connectionUrl: string) {
		this.publisher = new Redis(connectionUrl)
		this.subscriber = new Redis(connectionUrl)
	}

	public static async init(connectionUrl: string): Promise<void> {
		if (!this.instance) {
			this.instance = new RedisPubSubService(connectionUrl)
		}
	}

	public static getInstance(): RedisPubSubService {
		if (!this.instance) {
			throw new Error('RedisPubSubService not initialized')
		}
		return this.instance
	}

	public async publish<T>(event: AppEvent<T>): Promise<void> {
		await this.publisher.publish(
			event.eventName,
			JSON.stringify(event.plainObject())
		)
	}

	public async subscribe(
		topic: string,
		fn: (message: string) => void
	): Promise<void> {
		await this.subscriber.subscribe(topic)
		this.subscriber.on('message', (channel, msg) => {
			if (channel === topic) fn(msg)
		})
	}
}
