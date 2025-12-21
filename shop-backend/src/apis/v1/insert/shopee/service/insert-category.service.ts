import LoggerService from '@core/libs/logger/logger.system'
import { InsertCategoryDto } from '../dto'
import fs from 'fs'
import path from 'path'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
export default class InsertCategoryService {
	static BATCH_SIZE = 250
	static QUEUE = 'home_categories.insert.queue'

	private _dataBatch: InsertCategoryDto[] = []
	private _dataBatchChild: InsertCategoryDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService: ElasticSearchService
	) {}

	public insert = async () => {
		try {
			console.log('InsertCategoryService')

			const filePath = path.resolve(
				`storage/resources/shop/categoryTree/category_tree.json`
			)
			if (!fs.existsSync(filePath)) {
				this._loggerService.warn(`⚠️ File not found: ${filePath}`)
				return
			}
			await this._processFileStream(filePath)

			await this._flushRemainingData()
			await this._flushRemainingDataChild()
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	private async _processFileStream(filePath: string): Promise<void> {
		try {
			const content = await fs.promises.readFile(filePath, 'utf8')
			const data = JSON.parse(content)?.data?.category_list || []
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data.forEach((item: any) => {
				const rootCategory = InsertCategoryDto.fromJson(item)
				this._addToCategoryBatch(rootCategory)

				if (Array.isArray(item.children) && item.children.length > 0) {
					item.children.forEach((child: any) => {
						const childCategory = InsertCategoryDto.fromJson(child)
						this._addToCategoryChildBatch(childCategory)
					})
				}
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	// ========================= ROOT CATEGORY =========================
	private async _addToCategoryBatch(data: InsertCategoryDto): Promise<void> {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertCategoryService.BATCH_SIZE) {
			await this._publishBatch(this._dataBatch)
			this._dataBatch = []
		}
	}

	private async _flushRemainingData(): Promise<void> {
		if (this._dataBatch.length > 0) {
			await this._publishBatch(this._dataBatch)
			this._dataBatch = []
		}
	}

	// ========================= CHILD CATEGORY =========================
	private async _addToCategoryChildBatch(
		data: InsertCategoryDto
	): Promise<void> {
		this._dataBatchChild.push(data)
		if (this._dataBatchChild.length >= InsertCategoryService.BATCH_SIZE) {
			await this._publishBatch(this._dataBatchChild)
			this._dataBatchChild = []
		}
	}

	private async _flushRemainingDataChild(): Promise<void> {
		if (this._dataBatchChild.length > 0) {
			await this._publishBatch(this._dataBatchChild)
			this._dataBatchChild = []
		}
	}

	// ========================= PRODUCER =========================
	private async _publishBatch(batch: InsertCategoryDto[]): Promise<void> {
		const message = JSON.stringify(batch)

		await this._rabbitMqService.assertQueue(InsertCategoryService.QUEUE, {
			durable: true
		})

		this._rabbitMqService.sendToQueue(
			InsertCategoryService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${batch.length}) to queue: ${InsertCategoryService.QUEUE}`
		)
	}
}

// private _insertToElasticsearch(categories: InsertCategoryDto[]) {
// 	const body = categories.flatMap((item) => [
// 		{ index: { _index: 'home_categories', _id: item.id } },
// 		{
// 			id: item.id,
// 			display_name: item.display_name ?? null,
// 			parent_cat_id: item.parent_catid ?? null,
// 			name: item.name ?? null,
// 			image: item.image ?? null,
// 			unselected_image: item.unselected_image ?? null,
// 			selected_image: item.selected_image ?? null,
// 			level: item.level ?? null,
// 			is_active: Boolean(item.is_active),
// 			metadata: item.metadata ?? null,
// 			created_by: item.created_by ?? null,
// 			updated_by: item.updated_by ?? null,
// 			deleted_by: item.deleted_by ?? null,
// 			created_at: item.created_at ?? new Date().toISOString(),
// 			updated_at: item.updated_at ?? new Date().toISOString(),
// 			deleted_at: item.deleted_at ?? null
// 		}
// 	])

// 	this._elasticSearchService.bulk({
// 		refresh: true,
// 		body
// 	})
// }
