import fs from 'fs'
import path from 'path'
import LoggerService from '@core/libs/logger/logger.system'
import { InsertTopProductDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import { PostTopProductModel } from '@post/extensions/top-product/model'

export default class InsertTopProductService {
	static BATCH_SIZE = 250
	static QUEUE = 'top_products.insert.queue'

	private _dataBatch: InsertTopProductDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public insert = async () => {
		try {
			console.log('InsertTopProductService')

			const filePath = path.resolve(
				`storage/resources/common/topProducts/top.json`
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
				JSON.parse(content)?.data?.sections[0]?.data?.top_product || []

			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data?.forEach((item: any) => {
				const newData = InsertTopProductDto.fromJson(item)
				this._addToBatch(newData)
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: PostTopProductModel): Promise<void> {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertTopProductService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	private async _flushRemainingData(): Promise<void> {
		if (this._dataBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		try {
			const message = JSON.stringify(this._dataBatch)

			await this._rabbitMqService.assertQueue(
				InsertTopProductService.QUEUE,
				{
					durable: true
				}
			)

			this._rabbitMqService.sendToQueue(
				InsertTopProductService.QUEUE,
				Buffer.from(message),
				{ persistent: true }
			)

			this._loggerService.info(
				`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertTopProductService.QUEUE}`
			)

			this._dataBatch = []
		} catch (error: any) {
			this._loggerService.error(
				`❌ Error publishing batch: ${error.message}`
			)
		}
	}
}
