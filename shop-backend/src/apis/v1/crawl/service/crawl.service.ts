import axios from 'axios'
import fs from 'fs'
import SHOP_IDS from '../resource/shopid.json'
import INFO from '../resource/info.json'
import * as util from 'util'
import EnvConfig from '@configs/env.config'
import request from 'request'
const writeFile = util.promisify(fs.writeFile)

export default class CrawlService {
	private _endPoint: string = EnvConfig.server.urlData!

	public async productsDetail() {
		const requestPromises = Object.values(INFO)
			.flat()
			.map(async (itemId, index) => {
				return new Promise<void>((resolve, reject) => {
					console.log(itemId, 'itemIditemIditemIditemIditemId')
					setTimeout(() => {
						request(
							`https://tiki.vn/api/v2/products/${itemId}`,
							async (error: any, response: any, body: any) => {
								if (error) {
									console.error(
										`Error fetching product ${itemId}:`,
										error
									)
									return reject(error)
								}

								try {
									await writeFile(
										`./data2/post_${index}.json`,
										body
									)
									console.log(
										`Data for product ${itemId} written successfully.`
									)
									resolve()
								} catch (err) {
									console.error(
										`Error writing file for product ${itemId}:`,
										err
									)
									reject(err)
								}
							}
						)
					}, 500 * index)
				})
			})

		try {
			await Promise.all(requestPromises)
			console.log('All products fetched and saved successfully.')
		} catch (error) {
			console.error('Error fetching and saving products:', error)
		}
	}

	public products() {
		const config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: 'https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=1000&version=home-persionalized',
			headers: {}
		}

		axios
			.request(config)
			.then((response) => {
				const tabs: any[] = response.data.tabs
				const listItemId: any[] = []
				const listShopId: any[] = []
				tabs.forEach((tab: any, index: number) => {
					const items: any[] = tab.items
					items.forEach((item: any) => {
						if (!listItemId.includes(item.id)) {
							listItemId.push(item.id)
						}

						if (
							!listShopId.includes(
								item.visible_impression_info?.amplitude
									?.seller_id
							)
						) {
							listShopId.push(
								item.visible_impression_info?.amplitude
									?.seller_id
							)
						}
					})
				})

				console.log(JSON.stringify(listShopId), 'listShopId')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	public async getShopIds() {
		const ListPostIdShop = new Map<number, number[]>()

		const requestPromises = SHOP_IDS.map((shopId, index) => {
			return new Promise<void>((resolve, reject) => {
				setTimeout(() => {
					const config = {
						method: 'get',
						maxBodyLength: Infinity,
						url: `https://api.tiki.vn/seller-store/v2/collections/1/products?seller_id=${shopId}&cursor=0&limit=1000`,
						headers: {
							accept: 'application/json, text/plain, */*',
							'user-agent': 'Mozilla/5.0',
							'x-source': 'local'
						}
					}

					axios
						.request(config)
						.then((response) => {
							const items: any[] = response.data?.data
							if (items) {
								items.forEach((item) => {
									if (!ListPostIdShop.has(shopId)) {
										ListPostIdShop.set(shopId, [])
									}
									const postIdArray =
										ListPostIdShop.get(shopId)
									if (
										postIdArray &&
										!postIdArray.includes(item.id)
									) {
										postIdArray.push(item.id)
									}
								})
							}
							resolve()
						})
						.catch((error) => {
							console.log(error)
							reject(error)
						})
				}, 1000 * index)
			})
		})

		await Promise.all(requestPromises)

		const plainObject = Object.fromEntries(ListPostIdShop)
		return {
			ListPostIdShop: plainObject
		}
	}
}
