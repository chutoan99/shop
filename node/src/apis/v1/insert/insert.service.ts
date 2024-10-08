import InsertRepository from './insert.repository'
import InsertHelper from './insert.helper'
import axios from 'axios'
import { LoggerSystem } from '~/systems/logger'
import InsertRepositoryMsSQl from './insert.repository.mssql'
export default class InsertService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _insertRepository: InsertRepository
	private readonly _insertRepositoryMssql: InsertRepositoryMsSQl
	private readonly _insertHelper: InsertHelper

	constructor() {
		this._insertHelper = new InsertHelper()
		this._loggerSystem = new LoggerSystem()
		this._insertRepository = new InsertRepository()
		this._insertRepositoryMssql = new InsertRepositoryMsSQl()
	}

	public FormatIndustries = async () => {
		try {
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const dataBatch: any[][] = []
			for (let index = 1; index < 15; index++) {
				const response = await axios.get(
					`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/cate/cate_${index}.json`
				)
				const jsonData = response.data

				const globalCats = jsonData?.data.global_cats
				for (const item of globalCats) {
					for (let j = 0; j < item.path.length; j++) {
						// ************************************************************
						// CREATE MODE
						// ************************************************************
						const newIndustry =
							this._insertHelper.processDataIndustry(item, j)
						dataBatch.push([
							newIndustry.id,
							newIndustry.parent_catid,
							newIndustry.level,
							newIndustry.category_name,
							newIndustry.images
						])
						if (dataBatch.length === batchSize) {
							this._insertRepositoryMssql.Industry(dataBatch)
							dataBatch.length = 0
						}
					}
				}
			}
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.Industry(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatHomeCategory = async () => {
		try {
			const batchSize = 10
			const dataBatch: any[][] = []
			const dataBatchChild: any[][] = []

			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/category_tree.json`
			)
			if (response?.data) {
				for (const item of response?.data?.data?.category_list) {
					const newCategory =
						this._insertHelper.processDataCategory(item)

					dataBatch.push([
						newCategory.id,
						newCategory.parent_catid,
						newCategory.name,
						newCategory.display_name,
						newCategory.image,
						newCategory.unselected_image,
						newCategory.selected_image,
						newCategory.level
					])
					if (dataBatch.length === batchSize) {
						this._insertRepositoryMssql.InsertHomeCategories(dataBatch)
						dataBatch.length = 0
					}

					if (item.children) {
						for (const ele of item.children) {
							const newCategory =
								this._insertHelper.processDataCategory(ele)
                dataBatchChild.push([
                  newCategory.id,
                  newCategory.parent_catid,
                  newCategory.name,
                  newCategory.display_name,
                  newCategory.image,
                  newCategory.unselected_image,
                  newCategory.selected_image,
                  newCategory.level
                ])

							if (dataBatchChild.length === batchSize) {
								this._insertRepositoryMssql.InsertHomeCategories(
									dataBatchChild
								)
								dataBatchChild.length = 0
							}
						}
					}
				}
			}

			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertHomeCategories(dataBatch)
			}
			if (dataBatchChild.length > 0) {
				this._insertRepositoryMssql.InsertHomeCategories(dataBatchChild)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatBanner = async () => {
		try {
			const dataBatch: any[][] = []
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/banner.json`
			)

			response.data?.data?.space_banners[0]?.banners?.forEach(
				(item: any) => {
					// ************************************************************
					// CREATE MODE
					// ************************************************************
					const newBanner = this._insertHelper.processDataBanner(item)
					dataBatch.push([newBanner.image_url])
					if (dataBatch.length === batchSize) {
						this._insertRepositoryMssql.InsertBanner(dataBatch)
						dataBatch.length = 0
					}
				}
			)
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertBanner(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatShopMall = async () => {
		try {
			const dataBatch: any[][] = []
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const response = await axios.get(
          `https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/shopMall.json`
			)
			response?.data?.data?.shops?.forEach((item: any) => {
				// ************************************************************
				// CREATE MODE
				// ************************************************************
				const newShop = this._insertHelper.processDataShopMall(item)
				dataBatch.push([
					newShop.id,
					newShop.url,
					newShop.image,
					newShop.promo_text
				])
				if (dataBatch.length === batchSize) {
					this._insertRepositoryMssql.InsertShopMall(dataBatch)
					dataBatch.length = 0
				}
			})
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertShopMall(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatSearchSuggestion = async () => {
		try {
			const dataBatch: any[][] = []
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/search_suggestion.json`
			)

			response?.data &&
				Array(response.data).forEach((item: any) => {
					// ************************************************************
					// CREATE MODE
					// ************************************************************
					const newSuggestion =
						this._insertHelper.processDataSearchSuggest(item)
					dataBatch.push([newSuggestion.text, newSuggestion.count])
					if (dataBatch.length === batchSize) {
						this._insertRepositoryMssql.InsertSearchSuggestion(
							dataBatch
						)
						dataBatch.length = 0
					}
				})
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertSearchSuggestion(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatInsertNotify = async () => {
		try {
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const dataBatch: any[][] = []
			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/notify.json`
			)

			response?.data &&
				response.data?.forEach((item: any) => {
					const newNotify = this._insertHelper.processDataNotify(item)
					// ************************************************************
					// CREATE MODE
					// ************************************************************
					dataBatch.push([
						newNotify.userid,
						newNotify.seen,
						newNotify.image,
						newNotify.title,
						newNotify.content,
						newNotify.time
					])

					if (dataBatch.length === batchSize) {
						this._insertRepositoryMssql.InsertNotify(dataBatch)
						dataBatch.length = 0
					}
				})
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertNotify(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatBatchList = async () => {
		try {
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const dataBatch: any[][] = []
			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/batch_list.json`
			)
			response?.data?.data?.banners[1]?.banners.forEach((item: any) => {
				// ************************************************************
				// CREATE MODE
				// ************************************************************
				const newBatchList =
					this._insertHelper.processDataBatchList(item)
				dataBatch.push([
					newBatchList.banner_image,
					newBatchList.title,
					newBatchList.end,
					newBatchList.start
				])
				if (dataBatch.length === batchSize) {
					this._insertRepositoryMssql.InsertBatchList(dataBatch)
					dataBatch.length = 0
				}
			})
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertBatchList(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatTopProduct = async () => {
		try {
			const batchSize = 10 // Số lượng bản ghi trong mỗi batch
			const dataBatch: any[][] = []
			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/top.json`
			)
			response?.data?.data?.sections[0]?.data?.top_product?.forEach(
				(item: any) => {
					const newData =
						this._insertHelper.processDataTopProduct(item)

					// ************************************************************
					// CREATE MODE
					// ************************************************************
					dataBatch.push([
						newData.data_type,
						newData.count,
						newData.name,
						newData.images,
						newData.sort_type,
						newData.best_price,
						newData.display_text
					])
					if (dataBatch.length === batchSize) {
						this._insertRepositoryMssql.InsertTopProduct(dataBatch)
						dataBatch.length = 0
					}
				}
			)
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertTopProduct(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatFlashSale = async () => {
		try {
			const batchSize = 10
			const dataBatch: any[][] = []
			const response = await axios.get(
				`https://api.bitbucket.org/2.0/repositories/chutoan99/shopee/src/main/data/flash_sale.json`
			)

			response?.data?.data?.items?.forEach((item: any) => {
				// ************************************************************
				// CREATE MODE
				// ************************************************************
				const newFlashSale =
					this._insertHelper.processDataFlashSale(item)
				dataBatch.push([
					newFlashSale.id,
					newFlashSale.shopid,
					newFlashSale.catid,
					newFlashSale.name,
					newFlashSale.image,
					newFlashSale.stock,
					newFlashSale.historical_sold,
					newFlashSale.price,
					newFlashSale.price_before_discount,
					newFlashSale.discount,
					newFlashSale.shop_rating,
					newFlashSale.liked,
					newFlashSale.is_official_shop,
					newFlashSale.is_service_by_shopee,
					newFlashSale.show_free_shipping,
					newFlashSale.start_time,
					newFlashSale.end_time
				])
				if (dataBatch.length === batchSize) {
					this._insertRepositoryMssql.InsertFlashSale(dataBatch)
					dataBatch.length = 0
				}
			})
			if (dataBatch.length > 0) {
				this._insertRepositoryMssql.InsertFlashSale(dataBatch)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatShopAndUser = async (start: number, end: number) => {
		try {
			const batchSize = 2 // Số lượng bản ghi trong mỗi batch
			const dataUsers: any[][] = []
			const dataShops: any[][] = []
			for (let index = start; index < end; index++) {
				const response = await axios.get(
					`https://raw.githubusercontent.com/chutoan99/shop-data/main/shopDetail/shopDetail_${index}.json`
				)
				const newShop = this._insertHelper.processDataShop(
					response?.data
				)
				dataShops.push([
					newShop.id,
					newShop.userid,
					newShop.portrait,
					newShop.username,
					newShop.is_official_shop,
					newShop.shop_location,
					newShop.item_count,
					newShop.name,
					newShop.cover,
					newShop.rating_star,
					newShop.rating_bad,
					newShop.rating_good,
					newShop.rating_normal,
					newShop.follower_count,
					newShop.status,
					newShop.response_time,
					newShop.description,
					newShop.followed,
					newShop.response_rate,
					newShop.country,
					newShop.last_active_time,
					newShop.createdAt,
					newShop.updatedAt
				])
				if (dataShops.length === batchSize) {
					this._insertRepository.InsertShop(dataShops)
					dataShops.length = 0
				}
				// ************************************************************
				// CREATE MODE
				// ************************************************************
				const newUser = this._insertHelper.processDataUser(
					response?.data
				)
				dataUsers.push([
					newUser.id,
					newUser.shopid,
					newUser.name,
					newUser.username,
					newUser.email,
					newUser.sex,
					newUser.role,
					newUser.avatar,
					newUser.address,
					newUser.phone,
					newUser.password,
					newUser.createdAt,
					newUser.updatedAt
				])
				if (dataUsers.length === batchSize) {
					this._insertRepository.InsertUser(dataUsers)
					dataUsers.length = 0
				}
			}
			if (dataShops.length > 0) {
				this._insertRepository.InsertShop(dataShops)
			}
			if (dataUsers.length > 0) {
				this._insertRepository.InsertUser(dataUsers)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatComment = async (start: number, end: number) => {
		try {
			const batchSize = 500 // Số lượng bản ghi trong mỗi batch
			const dataComment: any[][] = []
			const dataRatingReply: any[][] = []
			for (let index = start; index < end; index++) {
				const response = await axios.get(
					`https://raw.githubusercontent.com/chutoan99/shop-data/main/ratings/rating_${index}.json`
				)
				response?.data?.data?.ratings?.forEach((item: any) => {
					// ************************************************************
					// CREATE MODE
					// ************************************************************
					const newComment =
						this._insertHelper.processDataComment(item)
					// ************************************************************
					// CREATE MODE
					// ************************************************************
					dataComment.push([
						newComment.id,
						newComment.orderid,
						newComment.itemid,
						newComment.rating,
						newComment.userid,
						newComment.shopid,
						newComment.parent_cmtid,
						newComment.comment,
						newComment.rating_star,
						newComment.status,
						newComment.author_username,
						newComment.author_portrait,
						newComment.images,
						newComment.cover,
						newComment.videos,
						newComment.tierVariation,
						newComment.list_option,
						newComment.is_replied,
						newComment.level,
						newComment.is_shop,
						newComment.like_count,
						newComment.liked,
						newComment.createdAt,
						newComment.updatedAt
					])
					if (dataComment.length === batchSize) {
						this._insertRepository.InsertComment(dataComment)
						dataComment.length = 0
					}

					if (item.ItemRatingReply !== null) {
						// ************************************************************
						// CREATE MODE
						// ************************************************************
						const newRatingReply =
							this._insertHelper.processDataRatingReply(item)
						dataRatingReply.push([
							newRatingReply.id,
							newRatingReply.orderid,
							newRatingReply.itemid,
							newRatingReply.rating,
							newRatingReply.userid,
							newRatingReply.shopid,
							newRatingReply.parent_cmtid,
							newRatingReply.comment,
							newRatingReply.rating_star,
							newRatingReply.status,
							newRatingReply.author_username,
							newRatingReply.author_portrait,
							newRatingReply.images,
							newRatingReply.cover,
							newRatingReply.videos,
							newRatingReply.tierVariation,
							newRatingReply.list_option,
							newRatingReply.is_replied,
							newRatingReply.level,
							newRatingReply.is_shop,
							newRatingReply.like_count,
							newRatingReply.liked,
							newRatingReply.createdAt,
							newRatingReply.updatedAt
						])
						if (dataRatingReply.length === batchSize) {
							this._insertRepository.InsertComment(
								dataRatingReply
							)
							dataRatingReply.length = 0
						}
					}
				})
			}
			if (dataComment.length > 0) {
				this._insertRepository.InsertComment(dataComment)
			}

			if (dataRatingReply.length > 0) {
				this._insertRepository.InsertComment(dataRatingReply)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public FormatPost = async (start: number, end: number) => {
		try {
			const batchSize = 500 // Số lượng bản ghi trong mỗi batch
			const dataDeepDiscountSkin: any[][] = []
			const dataVideoInfo: any[][] = []
			const dataVoucher: any[][] = []
			const dataPost: any[][] = []
			for (let index = start; index < end; index++) {
				const response = await axios.get(
					`https://raw.githubusercontent.com/chutoan99/shop-data/main/post/hot_items_${index}.json`
				)
				response?.data?.data?.items.forEach((item: any) => {
					this._prePostValues(item, dataPost, batchSize)
					this._preVideoInfoValues(item, dataVideoInfo, batchSize)
					this._preVoucherValues(item, dataVoucher, batchSize)
					this._preDeepDiscountSkinValues(
						item,
						dataDeepDiscountSkin,
						batchSize
					)
				})
			}

			if (dataDeepDiscountSkin.length > 0) {
				this._insertRepository.InsertDeepDiscountSkin(
					dataDeepDiscountSkin
				)
			}
			if (dataVideoInfo.length > 0) {
				this._insertRepository.InsertVideoInfoList(dataVideoInfo)
			}
			if (dataVoucher.length > 0) {
				this._insertRepository.InsertVoucherInfo(dataVoucher)
			}
			if (dataPost.length > 0) {
				this._insertRepository.InsertPost(dataPost)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	private _preDeepDiscountSkinValues(
		item: any,
		dataDeepDiscountSkin: any[][],
		batchSize: number
	) {
		if (
			item?.deep_discount_skin?.skin_data?.promo_label
				?.promotion_price !== ''
		) {
			// ************************************************************
			// CREATE MODE
			// ************************************************************
			const newDeepDiscount =
				this._insertHelper.processDataDeepDiscountSkin(item)
			dataDeepDiscountSkin.push([
				newDeepDiscount.id,
				newDeepDiscount.promotion_price,
				newDeepDiscount.hidden_promotion_price,
				newDeepDiscount.start_time,
				newDeepDiscount.end_time,
				newDeepDiscount.createdAt,
				newDeepDiscount.updatedAt
			])
			if (dataDeepDiscountSkin.length === batchSize) {
				this._insertRepository.InsertDeepDiscountSkin(
					dataDeepDiscountSkin
				)
				dataDeepDiscountSkin.length = 0
			}
		}
	}

	private _preVideoInfoValues(
		item: any,
		dataVideoInfo: any[][],
		batchSize: number
	) {
		if (typeof item?.video_info_list[0]?.video_id !== 'undefined') {
			// ************************************************************
			// CREATE MODE
			// ************************************************************
			const newVideo = this._insertHelper.processDataVideo(item)
			dataVideoInfo.push([
				newVideo.id,
				newVideo.thumb_url,
				newVideo.duration,
				newVideo.version,
				newVideo.defn,
				newVideo.profile,
				newVideo.url,
				newVideo.width,
				newVideo.height,
				newVideo.createdAt,
				newVideo.updatedAt
			])
			if (dataVideoInfo.length === batchSize) {
				this._insertRepository.InsertVideoInfoList(dataVideoInfo)
				dataVideoInfo.length = 0
			}
		}
	}

	private _preVoucherValues(
		item: any,
		dataVoucher: any[][],
		batchSize: number
	) {
		if (typeof item?.voucher_info?.promotion_id !== 'undefined') {
			const newVoucher = this._insertHelper.processDataVoucher(item)
			// ************************************************************
			// CREATE MODE
			// ************************************************************
			dataVoucher.push([
				newVoucher.id,
				newVoucher.voucher_code,
				newVoucher.label,
				newVoucher.createdAt,
				newVoucher.updatedAt
			])
			if (dataVoucher.length === batchSize) {
				this._insertRepository.InsertVoucherInfo(dataVoucher)
				dataVoucher.length = 0
			}
		}
	}

	private _prePostValues(item: any, dataPost: any[][], batchSize: number) {
		const newPost = this._insertHelper.processDataPost(item)
		dataPost.push([
			newPost.id,
			newPost.shopid,
			newPost.currency,
			newPost.stock,
			newPost.status,
			newPost.sold,
			newPost.liked_count,
			newPost.promotionid,
			newPost.videoid,
			newPost.discountid,
			newPost.catid,
			newPost.cmt_count,
			newPost.discount,
			newPost.description,
			newPost.raw_discount,
			newPost.size_chart,
			newPost.shop_name,
			newPost.transparent_background_image,
			newPost.images,
			newPost.view_count,
			newPost.name,
			newPost.image,
			newPost.historical_sold,
			newPost.price,
			newPost.price_min,
			newPost.price_max,
			newPost.price_before_discount,
			newPost.price_min_before_discount,
			newPost.price_max_before_discount,
			newPost.shop_rating,
			newPost.liked,
			newPost.is_official_shop,
			newPost.is_service_by_shop,
			newPost.show_free_shipping,
			newPost.name_attributes,
			newPost.value_attributes,
			newPost.name_tierVariations,
			newPost.option_tierVariations,
			newPost.images_tierVariations,
			newPost.createdAt,
			newPost.updatedAt
		])
		if (dataPost.length === batchSize) {
			this._insertRepository.InsertPost(dataPost)
			dataPost.length = 0
		}
	}
}
