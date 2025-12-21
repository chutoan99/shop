import EnvConfig from '@configs/env.config'
import { Channel, ChannelModel } from 'amqplib'
import amqplib from 'amqplib'

export default class RabbitMQConfig {
	private static instance: RabbitMQConfig | null = null
	private connection: ChannelModel | null = null
	private channel: Channel | null = null

	public static async getInstance(): Promise<RabbitMQConfig> {
		if (!RabbitMQConfig.instance) {
			RabbitMQConfig.instance = new RabbitMQConfig()
			await RabbitMQConfig.instance._connect()
		}
		return RabbitMQConfig.instance
	}

	private async _connect(): Promise<void> {
		const connectionString = EnvConfig.rabbitmq.url
		if (!connectionString) {
			throw new Error('RabbitMQ connection string is missing.')
		}

		this.connection = await amqplib.connect(connectionString)
		this.channel = await this.connection.createChannel()

		this.connection.on('error', (err) => {
			console.error('RabbitMQ connection error:', err)
		})

		this.connection.on('close', () => {
			console.log('RabbitMQ connection closed.')
		})

		console.log('✅ Connected to RabbitMQ.')
	}

	public getChannel(): Channel {
		if (!this.channel) {
			throw new Error('RabbitMQ channel is not initialized.')
		}
		return this.channel
	}

	public async closeConnection(): Promise<void> {
		if (this.channel) {
			await this.channel.close()
			this.channel = null
		}
		if (this.connection) {
			await this.connection.close()
			console.log('RabbitMQ connection closed.')
			this.connection = null
		}
	}
}
