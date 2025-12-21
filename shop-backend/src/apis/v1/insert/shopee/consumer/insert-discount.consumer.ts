import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertDiscountDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertDiscountConsumer extends BaseInsertService<InsertDiscountDto> {
	static STORE = 'call sp_insert_discounts(?)'
	static QUEUE = 'discounts.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertDiscountConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertDiscountConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertDiscountConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const discounts: InsertDiscountDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertDiscountConsumer.STORE, discounts)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${discounts.length} discounts`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting discounts: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
