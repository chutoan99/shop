import dotenv from 'dotenv'
import { InsertVoucherDto } from '../dto'
import LoggerService from '@core/libs/logger/logger.system'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
dotenv.config()

export default class InsertVoucherService {
	static BATCH_SIZE: number = 250
	static QUEUE = 'vouchers.insert.queue'
	private _dataVoucherBatch: InsertVoucherDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService: ElasticSearchService
	) {}

	public async addToVoucherBatch(data: InsertVoucherDto) {
		this._dataVoucherBatch.push(data)
		if (this._dataVoucherBatch.length >= InsertVoucherService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	public async flushRemainingVoucher() {
		if (this._dataVoucherBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		const message = JSON.stringify(this._dataVoucherBatch)

		await this._rabbitMqService.assertQueue(InsertVoucherService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertVoucherService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataVoucherBatch.length}) to queue: ${InsertVoucherService.QUEUE}`
		)
		this._dataVoucherBatch = []
	}
}
