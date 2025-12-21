import LoggerService from '@core/libs/logger/logger.system'
import { InsertBatchListDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import fs from 'fs'
import path from 'path'

export default class InsertBatchListService {
	static BATCH_SIZE = 250
	static QUEUE = 'batch_list.insert.queue'
	private _dataBatch: InsertBatchListDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService: ElasticSearchService
	) {}

	public insert = async () => {
		try {
			console.log('InsertBatchListService')

			const filePath = path.resolve(
				`storage/resources/common/batchList/batch_list.json`
			)
			if (!fs.existsSync(filePath)) {
				this._loggerService.warn(`⚠️ File not found: ${filePath}`)
				return
			}
			await this._processFileStream(filePath)
			await this._flushRemainingData()
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	private async _processFileStream(filePath: string): Promise<void> {
		try {
			const content = await fs.promises.readFile(filePath, 'utf8')
			const data = JSON.parse(content)?.data?.banners[1]?.banners || []
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data?.forEach((item: any) => {
				const newBatchList = InsertBatchListDto.fromJson(item)
				this._addToBatch(newBatchList)
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: InsertBatchListDto) {
		this._dataBatch.push(data)
		if (this._dataBatch.length === InsertBatchListService.BATCH_SIZE) {
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

		await this._rabbitMqService.assertQueue(InsertBatchListService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertBatchListService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertBatchListService.QUEUE}`
		)
		this._dataBatch = []
	}
}

// private _insertToElasticsearch(batchLists: InsertBatchListDto[]) {
// 	const body = batchLists.flatMap((item) => [
// 		{ index: { _index: 'batch_lists', _id: item.id } },
// 		{
// 			id: item.id,
// 			banner_image: item.banner_image ?? null,
// 			title: item.title ?? null,
// 			end: item.end ?? null,
// 			start: item.start ?? null,
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
