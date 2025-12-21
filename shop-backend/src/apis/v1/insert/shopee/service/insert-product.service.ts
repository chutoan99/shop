import fs from 'fs'
import path from 'path'
import { parser } from 'stream-json'
import { pick } from 'stream-json/filters/Pick'
import { streamArray } from 'stream-json/streamers/StreamArray'

import LoggerService from '@core/libs/logger/logger.system'
import InsertVideoService from './insert-video.service'
import InsertVoucherService from './insert-voucher.service'
import InsertDiscountService from './insert-discount.service'
import InsertPostService from './insert-post.service'

import { InsertPostDto } from '../dto/insert-post.dto'
import { InsertVideoDto } from '../dto/insert-video.dto'
import { InsertVoucherDto } from '../dto/insert-voucher.dto'
import { InsertDiscountDto } from '../dto/insert-discount.dto'
import { chain } from 'stream-chain'

export default class InsertProductService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _insertVideoService: InsertVideoService,
		private readonly _insertDiscountService: InsertDiscountService,
		private readonly _insertVoucherService: InsertVoucherService,
		private readonly _insertPostService: InsertPostService
	) {}

	public async insert(): Promise<void> {
		const start = 1
		const end = 1314

		try {
			for (let index = start; index < end; index++) {
				const filePath = path.resolve(
					`storage/resources/shop/post/hot_items_${index}.json`
				)

				if (!fs.existsSync(filePath)) {
					this._loggerService.warn(`⚠️ File not found: ${filePath}`)
					continue
				}

				this._loggerService.info(`📂 Processing file: ${filePath}`)
				await this._processFileStream(filePath)

				// 🕒 Thêm delay 500ms giữa mỗi file để giảm tải IO
				await this._delay(500)
			}

			await Promise.all([
				this._insertDiscountService.flushRemainingDiscount(),
				this._insertVideoService.flushRemainingVideo(),
				this._insertVoucherService.flushRemainingVoucher(),
				this._insertPostService.flushRemainingPost()
			])

			this._loggerService.info(
				'✅ All product files processed successfully!'
			)
		} catch (error: any) {
			this._loggerService.error(
				`❌ InsertProductService failed: ${error.message}`
			)
			throw error
		}
	}

	private async _processFileStream(filePath: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const fileName = path.basename(filePath)

			this._loggerService.info(`📂 Start processing: ${fileName}`)

			const pipeline = chain([
				fs.createReadStream(filePath, { encoding: 'utf8' }),
				parser(),
				pick({ filter: 'data.items' }),
				streamArray()
			])

			pipeline.on('data', async ({ value }) => {
				pipeline.pause()
				try {
					await this._processItem(value)

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

	private async _processItem(item: any): Promise<void> {
		// if (!item) return
		try {
			const tasks: Promise<any>[] = []

			// Always insert post
			const newPost = InsertPostDto.fromJson(item)
			tasks.push(this._insertPostService.addToPostBatch(newPost))

			// Optional inserts
			if (typeof item?.video_info_list?.[0]?.video_id !== 'undefined') {
				const newVideo = InsertVideoDto.fromJson(item)
				tasks.push(this._insertVideoService.addToVideoBatch(newVideo))
			}

			if (typeof item?.voucher_info?.promotion_id !== 'undefined') {
				const newVoucher = InsertVoucherDto.fromJson(item)
				tasks.push(
					this._insertVoucherService.addToVoucherBatch(newVoucher)
				)
			}

			if (
				item?.deep_discount_skin?.skin_data?.promo_label
					?.promotion_price !== ''
			) {
				const newDiscount = InsertDiscountDto.fromJson(item)
				tasks.push(
					this._insertDiscountService.addToDeepDiscountBatch(
						newDiscount
					)
				)
			}

			// Run all insertions in parallel
			await Promise.all(tasks)
		} catch (err: any) {
			this._loggerService.error(
				`❌ Failed to process product item: ${err.message}`
			)
		}
	}

	private async _delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
}
