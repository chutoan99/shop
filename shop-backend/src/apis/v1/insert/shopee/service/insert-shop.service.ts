import fs from 'fs'
import path from 'path'
import LoggerService from '@core/libs/logger/logger.system'
import { InsertShopDto } from '../dto/insert-shop.dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export default class InsertShopService {
	static BATCH_SIZE = 100
	static QUEUE = 'shops.insert.queue'

	private _dataBatch: InsertShopDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public async insert(): Promise<void> {
		const start = 0
		const end = 714

		for (let index = start; index < end; index++) {
			const filePath = path.resolve(
				`storage/resources/shop/shopDetail/shopDetail_${index}.json`
			)
			if (!fs.existsSync(filePath)) {
				this._loggerService.warn(`⚠️ File not found: ${filePath}`)
				continue
			}
			await this._processFileStream(filePath)

			// 🕒 Thêm delay 500ms giữa mỗi file để giảm tải IO
			await this._delay(500)
		}

		await this._flushRemainingShop()
	}

	private async _processFileStream(filePath: string): Promise<void> {
		try {
			const content = await fs.promises.readFile(filePath, 'utf8')
			const data = JSON.parse(content)
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			const newShop = InsertShopDto.fromJson(data)
			await this._addToShopBatch(newShop)

			// 🕒 Delay nhỏ giữa các phần tử để giảm áp lực CPU
			await this._delay(5)

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToShopBatch(data: InsertShopDto): Promise<void> {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertShopService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	private async _flushRemainingShop(): Promise<void> {
		if (this._dataBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		try {
			const message = JSON.stringify(this._dataBatch)
			await this._rabbitMqService.assertQueue(InsertShopService.QUEUE, {
				durable: true
			})
			this._rabbitMqService.sendToQueue(
				InsertShopService.QUEUE,
				Buffer.from(message),
				{ persistent: true }
			)

			this._loggerService.info(
				`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertShopService.QUEUE}`
			)

			this._dataBatch = []
		} catch (error: any) {
			this._loggerService.error(
				`❌ Error publishing batch: ${error.message}`
			)
		}
	}

	private async _delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
}
