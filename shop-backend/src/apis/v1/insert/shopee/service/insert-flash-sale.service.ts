import LoggerService from '@core/libs/logger/logger.system'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import { InsertFlashSaleDto } from '../dto'
import fs from 'fs'
import path from 'path'
export default class InsertFlashSaleService {
	static BATCH_SIZE = 250
	static QUEUE = 'flash_sales.insert.queue'

	private _dataBatch: InsertFlashSaleDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public insert = async () => {
		try {
			console.log('InsertBatchListService')

			const filePath = path.resolve(
				`storage/resources/common/flashSale/flash_sale.json`
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
			const data = JSON.parse(content)?.items || []
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data?.forEach((item: any) => {
				const newFlashSale = InsertFlashSaleDto.fromJson(item)
				this._addToBatch(newFlashSale)
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: InsertFlashSaleDto): Promise<void> {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertFlashSaleService.BATCH_SIZE) {
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

		await this._rabbitMqService.assertQueue(InsertFlashSaleService.QUEUE, {
			durable: true
		})

		this._rabbitMqService.sendToQueue(
			InsertFlashSaleService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertFlashSaleService.QUEUE}`
		)
		this._dataBatch = []
	}
}
