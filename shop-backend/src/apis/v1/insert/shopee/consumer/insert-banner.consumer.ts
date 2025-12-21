import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertBannerDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertBannerConsumer extends BaseInsertService<InsertBannerDto> {
	static STORE = 'call sp_insert_banners(?)'
	static QUEUE = 'banner.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertBannerConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertBannerConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertBannerConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const banners: InsertBannerDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertBannerConsumer.STORE, banners)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${banners.length} banners`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting banners: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
