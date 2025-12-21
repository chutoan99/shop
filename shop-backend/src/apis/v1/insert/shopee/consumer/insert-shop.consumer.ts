import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertShopDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertShopConsumer extends BaseInsertService<InsertShopDto> {
	static STORE = 'call sp_insert_shops(?)'
	static QUEUE = 'shops.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertShopConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertShopConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertShopConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const shops: InsertShopDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertShopConsumer.STORE, shops)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${shops.length} shops`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting shops: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
