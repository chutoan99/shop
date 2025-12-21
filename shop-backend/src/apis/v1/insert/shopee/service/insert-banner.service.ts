import LoggerService from '@core/libs/logger/logger.system'
import { InsertBannerDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import fs from 'fs'
import path from 'path'

export default class InsertBannerService {
	static BATCH_SIZE = 250
	static QUEUE = 'banner.insert.queue'

	private _dataBatch: InsertBannerDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public insert = async () => {
		try {
			console.log('InsertBannerService')

			const filePath = path.resolve(
				`storage/resources/common/banners/banner.json`
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
			const data =
				JSON.parse(content)?.data?.space_banners[0]?.banners || []
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data.forEach((item: any) => {
				const newBanner = InsertBannerDto.fromJson(item)
				this._addToBatch(newBanner)
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: InsertBannerDto): Promise<void> {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertBannerService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	private async _flushRemainingData(): Promise<void> {
		if (this._dataBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		const message = JSON.stringify(this._dataBatch)

		await this._rabbitMqService.assertQueue(InsertBannerService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertBannerService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertBannerService.QUEUE}`
		)
		this._dataBatch = []
	}
}

// private _insertToElasticsearch(banners: InsertBannerDto[]) {
// 	const body = banners.flatMap((banner) => [
// 		{ index: { _index: 'banners', _id: banner.id } },
// 		{
// 			id: banner.id,
// 			image_url: banner.image_url ?? null,
// 			is_active: Boolean(banner.is_active),
// 			metadata: banner.metadata ?? null,
// 			created_by: banner.created_by ?? null,
// 			updated_by: banner.updated_by ?? null,
// 			deleted_by: banner.deleted_by ?? null,
// 			created_at: banner.created_at ?? new Date().toISOString(),
// 			updated_at: banner.updated_at ?? new Date().toISOString(),
// 			deleted_at: banner.deleted_at ?? null
// 		}
// 	])

// 	this._elasticSearchService.bulk({
// 		refresh: true,
// 		body
// 	})
// }
