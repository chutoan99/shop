import { LoggerSystem } from '~/systems/logger'
import { IndustryModel } from '../client/industry/industry.model'
import { BannerModel } from '../client/banner/banner.model'
import { NotifyModel } from '../client/notify/notify.model'
import sql from 'mssql'
import { BatchListModel } from '../client/batchList/batchList.model'
import { TopProductModel } from '../client/topProduct/top-product.model'
import { MsSQlSystem } from '~/systems/dataBase'
import { SearchSuggestModel } from '../client/searchSuggest/search-suggest.model'
import { CategoryModel } from '../client/categoryTree/category-tree.model'
import { ShopMallModel } from '../client/shopMall/shop-mall.model'
import { FlashSaleModel } from '../client/flashSale/flash-sale.model'

export default class InsertRepositoryMsSQl {
	private readonly _loggerSystem: LoggerSystem
	private readonly _msSQlSystem: MsSQlSystem

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._msSQlSystem = new MsSQlSystem()
	}

	public Industry = (data: IndustryModel[][]) => {
		const json = data.map((row) => ({
			id: row[0],
			parent_catid: row[1],
			level: row[2],
			category_name: row[3],
			images: row[4]
		}))
		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_industries')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertBanner = (data: BannerModel[][]) => {
		const json = data.map((row) => ({
			image_url: row[0]
		}))

		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_Banners')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertNotify = async (data: NotifyModel[][]) => {
		const json = data.map((row) => ({
			userid: row[0],
			seen: row[1],
			image: row[2],
			title: row[3],
			content: row[4],
			time: row[5]
		}))

		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_notifications')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertBatchList = (data: BatchListModel[][]) => {
		const json = data.map((row) => ({
			banner_image: row[0],
			title: row[1],
			end: row[2],
			start: row[3]
		}))

		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_batchLists')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertTopProduct = (data: TopProductModel[][]) => {
		const json = data.map((row) => ({
			data_type: row[0],
			count: row[1],
			name: row[2],
			images: row[3],
			sort_type: row[4],
			best_price: row[5],
			display_text: row[6]
		}))
		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_topProducts')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertSearchSuggestion = (data: SearchSuggestModel[][]) => {
		const json = data.map((row) => ({
			text: row[0],
			count: row[1]
		}))

		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_searchSuggestions')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertHomeCategories = (data: CategoryModel[][]) => {
		const json = data.map((row) => ({
			id: row[0],
			parent_catid: row[1],
			name: row[2],
			display_name: row[3],
			image: row[4],
			unselected_image: row[5],
			selected_image: row[6],
			level: row[7]
		}))
		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_homeCategories')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public InsertShopMall = (data: ShopMallModel[][]) => {
		const json = data.map((row) => ({
			id: row[0],
			url: row[1],
			image: row[2],
			promo_text: row[3]
		}))

		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_shopMalls')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

  public InsertFlashSale = (data: FlashSaleModel[][]) => {
		const json = data.map((row) => ({
			id: row[0],
			shopid: row[1],
			catid: row[2],
			name: row[3],
			image: row[4],
			stock: row[5],
			historical_sold: row[6],
			price: row[7],
			price_before_discount: row[8],
			discount: row[9],
			shop_rating: row[10],
			liked: row[11],
			is_official_shop: row[12],
			is_service_by_shopee: row[13],
			show_free_shipping: row[14],
			start_time: row[15],
			end_time: row[16],
		}))

		try {
			const request = new sql.Request(this._msSQlSystem.db)
			request.input('JSON', sql.NVarChar(sql.MAX), JSON.stringify(json))
			request.execute('sp_insert_flashSales')
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
