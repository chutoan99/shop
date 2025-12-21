import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertCommentDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertCommentConsumer extends BaseInsertService<InsertCommentDto> {
	static STORE = 'call sp_insert_comments(?)'
	static QUEUE = 'comment.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertCommentConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertCommentConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertCommentConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const comments: InsertCommentDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertCommentConsumer.STORE, comments)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${comments.length} comments`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting comments: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
