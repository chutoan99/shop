import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertCategoryDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertCategoryConsumer extends BaseInsertService<InsertCategoryDto> {
	static STORE = 'call sp_insert_home_categories(?)'
	static QUEUE = 'home_categories.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertCategoryConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertCategoryConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertCategoryConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const categories: InsertCategoryDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertCategoryConsumer.STORE, categories)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${categories.length} categories`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting categories: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
