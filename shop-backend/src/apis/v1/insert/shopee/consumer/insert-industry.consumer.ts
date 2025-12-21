import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertFlashSaleDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertIndustryConsumer extends BaseInsertService<InsertFlashSaleDto> {
	static STORE = 'call sp_insert_industries(?)'
	static QUEUE = 'industries.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertIndustryConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertIndustryConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertIndustryConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const industries: InsertFlashSaleDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertIndustryConsumer.STORE, industries)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${industries.length} industries`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting industries: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
