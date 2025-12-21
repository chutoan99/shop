import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertVoucherDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertVoucherConsumer extends BaseInsertService<InsertVoucherDto> {
	static STORE = 'call sp_insert_vouchers(?)'
	static QUEUE = 'vouchers.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertVoucherConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertVoucherConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertVoucherConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const vouchers: InsertVoucherDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertVoucherConsumer.STORE, vouchers)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${vouchers.length} vouchers`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting vouchers: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
