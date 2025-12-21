import dotenv from 'dotenv'
import { InsertDiscountDto } from '../dto'
import LoggerService from '@core/libs/logger/logger.system'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

dotenv.config()
export default class InsertDiscountService {
	static BATCH_SIZE = 250
	static QUEUE = 'discounts.insert.queue'

	private _dataDiscountBatch: InsertDiscountDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public async addToDeepDiscountBatch(item: InsertDiscountDto) {
		this._dataDiscountBatch.push(item)

		if (
			this._dataDiscountBatch.length >= InsertDiscountService.BATCH_SIZE
		) {
			await this._publishBatch()
		}
	}

	public async flushRemainingDiscount(): Promise<void> {
		if (this._dataDiscountBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		const message = JSON.stringify(this._dataDiscountBatch)

		await this._rabbitMqService.assertQueue(InsertDiscountService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertDiscountService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataDiscountBatch.length}) to queue: ${InsertDiscountService.QUEUE}`
		)
		this._dataDiscountBatch = []
	}
}

// private _insertToElasticSearch(discounts: InsertDiscountDto[]) {
// 	const body = discounts.flatMap((discount) => [
// 		{ index: { _index: 'discounts', _id: discount.id } },
// 		{
// 			id: discount.id,
// 			promotion_price: discount.promotion_price ?? null,
// 			hidden_promotion_price: discount.hidden_promotion_price ?? null,
// 			text: discount.text ?? null,
// 			start_time: discount.start_time ?? null,
// 			end_time: discount.end_time ?? null,
// 			is_active: Boolean(discount.is_active),
// 			created_at: discount.created_at ?? new Date().toISOString(),
// 			updated_at: discount.updated_at ?? new Date().toISOString(),
// 			delete_at: discount.deleted_at ?? null,
// 			metadata: discount.metadata ?? null
// 		}
// 	])

// 	this._elasticSearchService.bulk({
// 		refresh: true,
// 		body
// 	})
// }
