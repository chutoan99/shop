import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertPostDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertPostConsumer extends BaseInsertService<InsertPostDto> {
	static STORE = 'call sp_insert_posts(?)'
	static QUEUE = 'posts.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertPostConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertPostConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertPostConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const posts: InsertPostDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertPostConsumer.STORE, posts)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${posts.length} posts`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting posts: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
