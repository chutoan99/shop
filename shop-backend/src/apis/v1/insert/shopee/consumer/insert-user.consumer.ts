import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertUserDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertUserConsumer extends BaseInsertService<InsertUserDto> {
	static STORE: string = 'call sp_insert_users(?)'
	static QUEUE = 'users.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertUserConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertUserConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertUserConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const users: InsertUserDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertUserConsumer.STORE, users)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${users.length} users`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting users: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
