import InsertBannerService from './service/insert-banner.service'
import InsertShopMallService from './service/insert-shop-mall.service'
import InsertCategoryService from './service/insert-category.service'
import InsertNotifyService from './service/insert-notify.service'
import InsertSuggestSearchService from './service/insert-suggest-search.service'
import InsertBatchListService from './service/insert-batch-list.service'
import InsertShopService from './service/insert-shop.service'
import InsertProductService from './service/insert-product.service'
import InsertCommentService from './service/insert-comment.service'
import InsertFlashSaleService from './service/insert-flash-sale.service'
import InsertIndustryService from './service/insert-industry.service'
import InsertTopProductService from './service/insert-top-product.service'
import InsertUserService from './service/insert-user.service'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
export default class InsertControllers {
	constructor(
		private readonly _insertShopService: InsertShopService,
		private readonly _insertBannerService: InsertBannerService,
		private readonly _insertProductService: InsertProductService,
		private readonly _insertCommentService: InsertCommentService,
		private readonly _insertShopMallService: InsertShopMallService,
		private readonly _insertFlashSaleService: InsertFlashSaleService,
		private readonly _insertIndustryService: InsertIndustryService,
		private readonly _insertCategoryService: InsertCategoryService,
		private readonly _insertNotifyService: InsertNotifyService,
		private readonly _insertTopProductService: InsertTopProductService,
		private readonly _insertSuggestSearchService: InsertSuggestSearchService,
		private readonly _insertBatchListService: InsertBatchListService,
		private readonly _insertUserService: InsertUserService,
		private readonly _loggerService: LoggerService,
		protected readonly _mySQLService: MySQLService
	) {}

	public App = async (req: any, res: any) => {
		try {
			await Promise.all([
				this._insertBannerService.insert(),
				this._insertBatchListService.insert(),
				this._insertCategoryService.insert(),
				this._insertNotifyService.insert(),
				this._insertShopMallService.insert(),
				this._insertSuggestSearchService.insert()
			])
			// this._loggerService.info('App finished ✅')

			// await this._insertUserService.insert()
			// this._loggerService.info('_insertUserService finished ✅')

			// await this._insertTopProductService.insert()
			// this._loggerService.info('_insertTopProductService finished ✅')

			// await this._insertFlashSaleService.insert()
			// this._loggerService.info('_insertFlashSaleService finished ✅')

			// await this._insertIndustryService.insert()
			// this._loggerService.info('_insertIndustryService finished ✅')

			// await this._insertShopService.insert()
			// this._loggerService.info('_insertShopService finished ✅')

			// await this._insertProductService.insert()
			// this._loggerService.info('_insertProductService finished ✅')

			// await this._insertCommentService.insert()
			// this._loggerService.info('_insertCommentService finished ✅')

			return res.status(200).json({
				message: 'Record processed successfully.'
			})
		} catch (err) {
			return {
				status: 400,
				message: 'Error while inserting:'
			}
		}
	}

	public RevertData = async (req: any, res: any) => {
		try {
			await this._mySQLService.query(`delete from defaultdb.banners`)
			this._loggerService.info(`delete from defaultdb.banners`)

			await this._mySQLService.query(`delete from defaultdb.batch_lists`)
			this._loggerService.info(`delete from defaultdb.batch_lists`)

			await this._mySQLService.query(`delete from defaultdb.carts`)
			this._loggerService.info(`delete from defaultdb.carts`)

			await this._mySQLService.query(`delete from defaultdb.comments`)
			this._loggerService.info(`delete from defaultdb.comments`)

			await this._mySQLService.query(`delete from defaultdb.discounts`)
			this._loggerService.info(`delete from defaultdb.discounts`)

			await this._mySQLService.query(`delete from defaultdb.flash_sales`)
			this._loggerService.info(`delete from defaultdb.flash_sales`)

			await this._mySQLService.query(
				`delete from defaultdb.histories_tracking`
			)
			this._loggerService.info(`delete from defaultdb.histories_tracking`)

			await this._mySQLService.query(
				`delete from defaultdb.home_categories`
			)
			this._loggerService.info(`delete from defaultdb.home_categories`)

			await this._mySQLService.query(`delete from defaultdb.industries`)
			this._loggerService.info(`delete from defaultdb.industries`)

			await this._mySQLService.query(`delete from defaultdb.likes`)
			this._loggerService.info(`delete from defaultdb.likes`)

			await this._mySQLService.query(`delete from defaultdb.orders`)
			this._loggerService.info(`delete from defaultdb.orders`)

			await this._mySQLService.query(`delete from defaultdb.posts`)
			this._loggerService.info(`delete from defaultdb.posts`)

			await this._mySQLService.query(`delete from defaultdb.shop_malls`)
			this._loggerService.info(`delete from defaultdb.shop_malls`)

			await this._mySQLService.query(`delete from defaultdb.shops`)
			this._loggerService.info(`delete from defaultdb.shops`)

			await this._mySQLService.query(
				`delete from defaultdb.suggests_search`
			)
			this._loggerService.info(`delete from defaultdb.suggests_search`)

			await this._mySQLService.query(`delete from defaultdb.top_products`)
			this._loggerService.info(`delete from defaultdb.top_products`)

			await this._mySQLService.query(`delete from defaultdb.users`)
			this._loggerService.info(`delete from defaultdb.users`)

			await this._mySQLService.query(`delete from defaultdb.vouchers`)
			this._loggerService.info(`delete from defaultdb.vouchers`)

			await this._mySQLService.query(`delete from defaultdb.videos`)
			this._loggerService.info(`delete from defaultdb.videos`)

			return res.status(200).json({
				message: 'RevertData processed successfully.'
			})
		} catch (err) {
			return {
				status: 400,
				message: 'Error while inserting:'
			}
		}
	}
}
