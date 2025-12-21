import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import LoggerService from '@core/libs/logger/logger.system'
import { InsertShopMallDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import fs from 'fs'
import path from 'path'
export default class InsertShopMallService {
	static BATCH_SIZE = 250
	static QUEUE = 'shop_malls.insert.queue'
	private _dataBatch: InsertShopMallDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public insert = async () => {
		try {
			console.log('InsertShopMallService')

			const filePath = path.resolve(
				`storage/resources/common/shopMall/shopMall.json`
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
			const data = JSON.parse(content)?.data?.shops || []
			if (!data) {
				this._loggerService.warn(
					`⚠️ [${path.basename(filePath)}] No 'data' found.`
				)
				return
			}

			data?.forEach((item: any) => {
				const newShop = InsertShopMallDto.fromJson(item)
				this._addToBatch(newShop)
			})

			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToBatch(data: InsertShopMallDto) {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertShopMallService.BATCH_SIZE) {
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

		await this._rabbitMqService.assertQueue(InsertShopMallService.QUEUE, {
			durable: true
		})
		this._rabbitMqService.sendToQueue(
			InsertShopMallService.QUEUE,
			Buffer.from(message),
			{ persistent: true }
		)

		this._loggerService.info(
			`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertShopMallService.QUEUE}`
		)
		this._dataBatch = []
	}
}
