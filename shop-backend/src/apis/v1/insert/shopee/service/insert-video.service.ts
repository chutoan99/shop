import dotenv from 'dotenv'
import { InsertVideoDto } from '../dto'
import LoggerService from '@core/libs/logger/logger.system'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
dotenv.config()

export default class InsertVideoService {
	static BATCH_SIZE: number = 250
	static QUEUE = 'videos.insert.queue'
	private _dataVideoBatch: InsertVideoDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService?: ElasticSearchService
	) {}

	public async addToVideoBatch(data: InsertVideoDto) {
		this._dataVideoBatch.push(data)
		if (this._dataVideoBatch.length >= InsertVideoService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	public async flushRemainingVideo() {
		if (this._dataVideoBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		const message = JSON.stringify(this._dataVideoBatch)

		await this._rabbitMqService.assertQueue(InsertVideoService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertVideoService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataVideoBatch.length}) to queue: ${InsertVideoService.QUEUE}`
		)
		this._dataVideoBatch = []
	}
}
