import { ConsumeMessage } from 'amqplib'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { InsertBatchListDto } from '../dto'
import { BaseInsertService } from '../base-insert.service'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export class InsertBatchListConsumer extends BaseInsertService<InsertBatchListDto> {
	static STORE = 'call sp_insert_batch_lists(?)'
	static QUEUE = 'batch_list.insert.queue'

	constructor(
		protected readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService,
		private readonly _rabbitMqService: RabbitMqService
	) {
		super(_loggerService, _mySQLService)
	}

	public async startConsumer() {
		await this._rabbitMqService.assertQueue(InsertBatchListConsumer.QUEUE, {
			durable: true
		})
		this._rabbitMqService.prefetch(1)

		this._loggerService.info(
			`✅ Waiting for messages in queue: ${InsertBatchListConsumer.QUEUE}`
		)

		this._rabbitMqService.consume(
			InsertBatchListConsumer.QUEUE,
			async (msg: ConsumeMessage | null) => {
				if (!msg) return

				try {
					const batchLists: InsertBatchListDto[] = JSON.parse(
						msg.content.toString()
					)
					await this.Insert(InsertBatchListConsumer.STORE, batchLists)
					this._rabbitMqService.ack(msg)

					this._loggerService.info(
						`✅ Inserted ${batchLists.length} batchLists`
					)
				} catch (error: any) {
					this._loggerService.error(
						`❌ Error inserting batchLists: ${error.message}`
					)
					this._rabbitMqService.nack(msg, false, true) // Requeue on error
				}
			}
		)
	}
}
