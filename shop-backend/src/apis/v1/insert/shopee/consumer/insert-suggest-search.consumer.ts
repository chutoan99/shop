import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertSuggestSearchDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertSuggestSearchConsumer extends BaseInsertService<InsertSuggestSearchDto> {
	static STORE = 'call sp_insert_suggests_search(?)'
	static QUEUE = 'suggests_search.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(
			InsertSuggestSearchConsumer.QUEUE,
			{
				durable: true
			}
		)
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertSuggestSearchConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertSuggestSearchConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const suggestSearchs: InsertSuggestSearchDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(
						InsertSuggestSearchConsumer.STORE,
						suggestSearchs
					)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${suggestSearchs.length} suggestSearchs`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting suggestSearchs: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
