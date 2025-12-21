import fs from 'fs'
import path from 'path'
import { chain } from 'stream-chain'
import { parser } from 'stream-json'
import { pick } from 'stream-json/filters/Pick'
import { streamArray } from 'stream-json/streamers/StreamArray'
import LoggerService from '@core/libs/logger/logger.system'
import { InsertCommentDto, typeComment } from '../dto/insert-comment.dto'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export default class InsertCommentService {
	static BATCH_SIZE = 250
	static QUEUE = 'comment.insert.queue'

	private _dataCommentBatch: InsertCommentDto[] = []
	private _dataReplyBatch: InsertCommentDto[] = []

	constructor(
		protected readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	/**
	 * Đọc tất cả file JSON dạng rating_x.json theo stream để tránh hết RAM
	 */
	public async insert() {
		const start = 0
		const end = 1939

		for (let index = start; index < end; index++) {
			const filePath = path.resolve(
				`storage/resources/shop/ratings/rating_${index}.json`
			)
			if (!fs.existsSync(filePath)) continue

			this._loggerService.info(`📂 Processing file: rating_${index}.json`)
			await this._processFileStream(filePath)

			// 🕒 Thêm delay 500ms giữa mỗi file để giảm tải IO
			await this._delay(500)
		}

		await this._flushRemainingComment()
		await this._flushRemainingReply()

		this._dataCommentBatch = []
		this._dataReplyBatch = []
		global.gc?.()

		this._loggerService.info('✅ All files processed successfully')
	}

	/**
	 * Xử lý từng file JSON bằng stream
	 */
	private async _processFileStream(filePath: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const fileName = path.basename(filePath)

			this._loggerService.info(`📂 Start processing: ${fileName}`)

			const pipeline = chain([
				fs.createReadStream(filePath, { encoding: 'utf8' }),
				parser(),
				pick({ filter: 'data.ratings' }),
				streamArray()
			])

			pipeline.on('data', async ({ value }) => {
				pipeline.pause()

				try {
					const comment = InsertCommentDto.fromJson(
						value,
						typeComment.comment
					)
					await this._addToDeepCommentBatch(comment)

					if (value.ItemRatingReply) {
						const reply = InsertCommentDto.fromJson(
							value,
							typeComment.reply
						)
						await this._addToDeepReplyBatch(reply)
					}

					// 🕒 Delay nhỏ giữa các phần tử để giảm áp lực CPU
					await this._delay(5)
				} catch (err: any) {
					this._loggerService.error(
						`❌ [${fileName}] Error parsing item: ${err.message}`
					)
				} finally {
					pipeline.resume()
				}
			})

			pipeline.on('error', (err) => {
				this._loggerService.error(
					`❌ [${fileName}] Stream error: ${err.message}`
				)
				reject(err)
			})

			pipeline.on('end', () => {
				this._loggerService.info(`✅ Finished processing: ${fileName}`)
				resolve()
			})
		})
	}

	// ************************************************************
	// COMMENT
	// ************************************************************
	private async _addToDeepCommentBatch(item: InsertCommentDto) {
		this._dataCommentBatch.push(item)
		console.log(this._dataCommentBatch.length, 'this._dataCommentBatch')
		if (this._dataCommentBatch.length >= InsertCommentService.BATCH_SIZE) {
			await this._publishBatch(this._dataCommentBatch)
			this._dataCommentBatch = []
		}
	}

	private async _flushRemainingComment() {
		if (this._dataCommentBatch.length > 0) {
			await this._publishBatch(this._dataCommentBatch)
			this._dataCommentBatch = []
		}
	}

	// ************************************************************
	// REPLY
	// ************************************************************
	private async _addToDeepReplyBatch(item: InsertCommentDto) {
		this._dataReplyBatch.push(item)
		if (this._dataReplyBatch.length >= InsertCommentService.BATCH_SIZE) {
			await this._publishBatch(this._dataReplyBatch)
			this._dataReplyBatch = []
		}
	}

	private async _flushRemainingReply() {
		if (this._dataReplyBatch.length > 0) {
			await this._publishBatch(this._dataReplyBatch)
			this._dataReplyBatch = []
		}
	}

	// ************************************************************
	// PUBLISH
	// ************************************************************
	private async _publishBatch(batch: InsertCommentDto[]): Promise<void> {
		try {
			const message = JSON.stringify(batch)

			await this._rabbitMqService.assertQueue(
				InsertCommentService.QUEUE,
				{
					durable: true
				}
			)

			this._rabbitMqService.sendToQueue(
				InsertCommentService.QUEUE,
				Buffer.from(message),
				{ persistent: true }
			)

			this._loggerService.info(
				`📤 Sent batch (${batch.length}) to queue: ${InsertCommentService.QUEUE}`
			)
		} catch (err: any) {
			this._loggerService.error(
				`❌ Failed to publish batch: ${err.message}`
			)
		}
	}

	private async _delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
}
