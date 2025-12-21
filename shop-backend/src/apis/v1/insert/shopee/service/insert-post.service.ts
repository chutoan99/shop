import dotenv from 'dotenv'
import { InsertPostDto } from '../dto/insert-post.dto'
import LoggerService from '@core/libs/logger/logger.system'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
dotenv.config()

export default class InsertPostService {
	static BATCH_SIZE: number = 250
	static QUEUE = 'posts.insert.queue'
	private _dataPostBatch: InsertPostDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService: ElasticSearchService
	) {}

	public async addToPostBatch(data: InsertPostDto) {
		this._dataPostBatch.push(data)
		if (this._dataPostBatch.length >= InsertPostService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	public async flushRemainingPost() {
		if (this._dataPostBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		const message = JSON.stringify(this._dataPostBatch)

		await this._rabbitMqService.assertQueue(InsertPostService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertPostService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataPostBatch.length}) to queue: ${InsertPostService.QUEUE}`
		)
		this._dataPostBatch = []
	}
}

// private _insertToElasticsearch(posts: InsertPostDto[]): void {
// 	const body = posts.flatMap((post) => [
// 		{ index: { _index: 'posts', _id: post.id } },
// 		{
// 			id: post.id,
// 			shop_id: post.shop_id,
// 			cat_id: post.cat_id,
// 			video_id: post.video_id,
// 			promotion_id: post.promotion_id,
// 			discount_id: post.discount_id,
// 			currency: post.currency,
// 			stock: post.stock,
// 			status: post.status,
// 			sold: post.sold,
// 			liked_count: post.liked_count,
// 			cmt_count: post.cmt_count,
// 			discount: post.discount,
// 			raw_discount: post.raw_discount,
// 			size_chart: post.size_chart,
// 			shop_name: post.shop_name,
// 			description: post.description,
// 			transparent_background_image: post.transparent_background_image,
// 			images: post.images,
// 			view_count: post.view_count,
// 			name: post.name,
// 			image: post.image,
// 			price: post.price,
// 			price_min: post.price_min,
// 			price_max: post.price_max,
// 			historical_sold: post.historical_sold,
// 			price_before_discount: post.price_before_discount,
// 			price_min_before_discount: post.price_min_before_discount,
// 			price_max_before_discount: post.price_max_before_discount,
// 			shop_rating: post.shop_rating,
// 			filename: post.filename,
// 			liked: Boolean(post.liked),
// 			is_official_shop: Boolean(post.is_official_shop),
// 			is_service_by_shop: Boolean(post.is_service_by_shop),
// 			show_free_shipping: Boolean(post.show_free_shipping),
// 			variations: post.variations,
// 			is_active: !!post.is_active,
// 			created_at: post.created_at ?? new Date().toISOString(),
// 			updated_at: post.updated_at ?? new Date().toISOString(),
// 			delete_at: post.deleted_at,
// 			metadata: post.metadata
// 		}
// 	])

// 	this._elasticSearchService.bulk({
// 		refresh: true,
// 		body
// 	})
// }
