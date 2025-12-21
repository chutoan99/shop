import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertVideoDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertVideoConsumer extends BaseInsertService<InsertVideoDto> {
	static STORE = 'call sp_insert_videos(?)'
	static QUEUE = 'videos.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertVideoConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertVideoConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertVideoConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const videos: InsertVideoDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertVideoConsumer.STORE, videos)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${videos.length} videos`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting videos: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
