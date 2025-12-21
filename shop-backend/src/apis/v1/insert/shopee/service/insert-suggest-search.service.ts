import LoggerService from '@core/libs/logger/logger.system'
import fs from 'fs'
import path from 'path'
import { InsertSuggestSearchDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export default class InsertSuggestSearchService {
	static BATCH_SIZE: number = 250
	static QUEUE = 'suggests_search.insert.queue'
	private _dataBatch: InsertSuggestSearchDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService // protected readonly _elasticSearchService: ElasticSearchService
	) {}

	public insert = async () => {
		try {
			console.log('InsertSuggestSearchService')

			const filePath = path.resolve(
				`storage/resources/common/searchSuggestion/search_suggestion.json`
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
			const data = JSON.parse(content) || []

			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data.forEach((item: any) => {
				const newSuggestion = InsertSuggestSearchDto.fromJson(item)
				this._addToBatch(newSuggestion)
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: InsertSuggestSearchDto) {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertSuggestSearchService.BATCH_SIZE) {
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

		await this._rabbitMqService.assertQueue(
			InsertSuggestSearchService.QUEUE,
			{
				durable: true
			}
		)
		this._rabbitMqService.sendToQueue(
			InsertSuggestSearchService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertSuggestSearchService.QUEUE}`
		)
		this._dataBatch = []
	}
}
// private _insertToElasticsearch(
// 	suggestions: InsertSuggestSearchDto[]
// ): void {
// 	const body = suggestions.flatMap((suggestion) => [
// 		{ index: { _index: 'suggests_search', _id: suggestion.id } },
// 		{
// 			id: suggestion.id,
// 			text: suggestion.text ?? null,
// 			count: suggestion.count ?? null,
// 			is_active: Boolean(suggestion.is_active) ?? false,
// 			metadata: suggestion.metadata ?? null,
// 			created_by: suggestion.created_by ?? null,
// 			deleted_by: suggestion.deleted_by ?? null,
// 			updated_by: suggestion.updated_by ?? null,
// 			created_at: suggestion.created_at ?? new Date().toISOString(),
// 			updated_at: suggestion.updated_at ?? new Date().toISOString(),
// 			deleted_at: suggestion.deleted_at ?? null
// 		}
// 	])

// 	this._elasticSearchService.bulk({
// 		refresh: true,
// 		body
// 	})
// }
