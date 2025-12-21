import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertTopProductDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertTopProductConsumer extends BaseInsertService<InsertTopProductDto> {
	static STORE = 'call sp_insert_top_products(?)'
	static QUEUE = 'top_products.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(
			InsertTopProductConsumer.QUEUE,
			{
				durable: true
			}
		)
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertTopProductConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertTopProductConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const topProducts: InsertTopProductDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(
						InsertTopProductConsumer.STORE,
						topProducts
					)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${topProducts.length} topProducts`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting topProducts: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
