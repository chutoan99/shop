import RabbitMQConfig from '@configs/rabbitmq.config'
import { Channel, ConsumeMessage, Message, Options } from 'amqplib'

export class RabbitMqService {
	private channel: Channel | null = null
	private initialized = false

	constructor() {}

	public async init(): Promise<void> {
		if (!this.initialized) {
			const rabbitMQConfig = await RabbitMQConfig.getInstance()
			this.channel = rabbitMQConfig.getChannel()
			this.initialized = true
		}
	}

	public async assertQueue(queue: string, options?: Options.AssertQueue) {
		await this.ensureInitialized()
		return this.channel!.assertQueue(queue, options)
	}

	public async sendToQueue(
		queue: string,
		content: Buffer,
		options?: Options.Publish
	) {
		await this.ensureInitialized()
		return this.channel!.sendToQueue(queue, content, options)
	}

	public async consume(
		queue: string,
		onMessage: (msg: ConsumeMessage | null) => void,
		options?: Options.Consume
	) {
		await this.ensureInitialized()
		return this.channel!.consume(queue, onMessage, options)
	}

	public async prefetch(count: number, global?: boolean) {
		await this.ensureInitialized()
		return this.channel!.prefetch(count, global)
	}

	public async ack(message: Message, allUpTo?: boolean) {
		await this.ensureInitialized()
		return this.channel!.ack(message, allUpTo)
	}

	public async nack(message: Message, allUpTo?: boolean, requeue?: boolean) {
		await this.ensureInitialized()
		return this.channel!.nack(message, allUpTo, requeue)
	}

	public async closeChannel() {
		if (this.channel) await this.channel.close()
	}

	private async ensureInitialized() {
		if (!this.initialized || !this.channel) {
			await this.init()
		}
	}
}
