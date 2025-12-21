import LoggerService from '@core/libs/logger/logger.system'
import { InsertIndustryDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import fs from 'fs'
import path from 'path'
export default class InsertIndustryService {
	static BATCH_SIZE: number = 250
	static QUEUE = 'industries.insert.queue'
	private _dataBatch: InsertIndustryDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService: ElasticSearchService
	) {}

	public async insert(): Promise<void> {
		console.log('InsertIndustryService')
		for (let index = 1; index < 15; index++) {
			const filePath = path.resolve(
				`storage/resources/shop/categories/cate_${index}.json`
			)
			if (!fs.existsSync(filePath)) {
				this._loggerService.warn(`⚠️ File not found: ${filePath}`)
				continue
			}
			await this._processFileStream(filePath)
		}

		await this._flushRemainingData()
	}

	private async _processFileStream(filePath: string): Promise<void> {
		try {
			const content = await fs.promises.readFile(filePath, 'utf8')
			const data = JSON.parse(content)?.data.global_cats
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			for (const item of data) {
				for (let j = 0; j < item.path.length; j++) {
					const newIndustry = InsertIndustryDto.fromJson(item, j)
					this._addToBatch(newIndustry)
				}
			}

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: InsertIndustryDto) {
		this._dataBatch.push(data)
		if (this._dataBatch.length === InsertIndustryService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	private async _flushRemainingData() {
		if (this._dataBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		const message = JSON.stringify(this._dataBatch)

		await this._rabbitMqService.assertQueue(InsertIndustryService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertIndustryService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertIndustryService.QUEUE}`
		)
		this._dataBatch = []
	}
}

// private _insertToElasticsearch(industries: InsertIndustryDto[]) {
// 	const body = industries.flatMap((industry) => [
// 		{ index: { _index: 'industries', _id: industry.id } },
// 		{
// 			id: industry.id,
// 			parent_cat_id: industry.parent_cat_id ?? null,
// 			level: industry.level ?? null,
// 			category_name: industry.category_name ?? null,
// 			images: industry.images ?? null,
// 			is_active: Boolean(industry.is_active),
// 			created_by: industry.created_by ?? null,
// 			updated_by: industry.updated_by ?? null,
// 			deleted_by: industry.deleted_by ?? null,
// 			created_at: industry.created_at ?? new Date().toISOString(),
// 			updated_at: industry.updated_at ?? new Date().toISOString(),
// 			deleted_at: industry.deleted_at ?? null
// 		}
// 	])

// 	this._elasticSearchService.bulk({
// 		refresh: true,
// 		body
// 	})
// }
