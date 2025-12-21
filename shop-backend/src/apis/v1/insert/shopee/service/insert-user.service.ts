import fs from 'fs'
import path from 'path'
import { InsertUserDto } from '../dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import LoggerService from '@core/libs/logger/logger.system'
export default class InsertUserService {
	static BATCH_SIZE = 100
	static QUEUE = 'users.insert.queue'
	private _dataBatch: InsertUserDto[] = []

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

		await this._flushRemainingUser()
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

			const user = InsertUserDto.fromJson(data)
			await this._addToUserBatch(user)

			// 🕒 Delay nhỏ giữa các phần tử để giảm áp lực CPU
			await this._delay(5)
			this._loggerService.info(`✅ Processed: ${filePath}`)
		} catch (err: any) {
			this._loggerService.error(`❌ [${filePath}] ${err.message}`)
		}
	}

	private async _addToUserBatch(data: InsertUserDto): Promise<void> {
		this._dataBatch.push(data)
		if (this._dataBatch.length >= InsertUserService.BATCH_SIZE) {
			await this._publishBatch()
		}
	}

	private async _flushRemainingUser(): Promise<void> {
		if (this._dataBatch.length > 0) {
			await this._publishBatch()
		}
	}

	private async _publishBatch(): Promise<void> {
		try {
			const message = JSON.stringify(this._dataBatch)
			await this._rabbitMqService.assertQueue(InsertUserService.QUEUE, {
				durable: true
			})
			this._rabbitMqService.sendToQueue(
				InsertUserService.QUEUE,
				Buffer.from(message),
				{ persistent: true }
			)

			this._loggerService.info(
				`📤 Sent batch (${this._dataBatch.length}) to queue: ${InsertUserService.QUEUE}`
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
