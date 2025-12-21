import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertShopMallDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertShopMallConsumer extends BaseInsertService<InsertShopMallDto> {
	static STORE = 'call sp_insert_shop_malls(?)'
	static QUEUE = 'shop_malls.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertShopMallConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertShopMallConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertShopMallConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const shopMalls: InsertShopMallDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertShopMallConsumer.STORE, shopMalls)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${shopMalls.length} shopMalls`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting shopMalls: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
