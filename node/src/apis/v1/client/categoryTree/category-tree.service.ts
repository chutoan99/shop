import MESSAGE from '~/@core/contains/message.json'
import CategoriesRepository from './category-tree.repository'
import { formatCategory } from './category-tree.helper'
import _ from 'lodash'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import {
	SearchCategoryResponse,
	CategoryResponse
} from './category-tree.response'
import { CategoryModel } from './category-tree.model'

interface ICategoriesTreeService {
	findCategoriesTree(level: number): Promise<CategoryResponse>
	searchCategoriesTree(catid: number): Promise<SearchCategoryResponse>
}

export default class CategoriesTreeService implements ICategoriesTreeService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _categoriesRepository: CategoriesRepository
	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._categoriesRepository = new CategoriesRepository()
	}

	public findCategoriesTree = async (
		level: number
	): Promise<CategoryResponse> => {
		try {
			const cacheKey: string = `category-tree-${level}`
			const cachedData = await this._redisSystem.getCache(cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: _.size(cachedData),
					response: formatCategory(cachedData)
				}
			}

			const response: CategoryModel[] =
				await this._categoriesRepository.findAll(level)

			if (_.isArray(response)) {
				await this._redisSystem.setCache(cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: _.size(response),
				response: formatCategory(response)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public searchCategoriesTree = async (
		catid: number
	): Promise<SearchCategoryResponse> => {
		try {
			const cacheKey: string = `category-tree-${catid}`
			const cachedData = await this._redisSystem.getCache(cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: _.size(cachedData),
					response: cachedData
				}
			}

			const response: CategoryModel[] =
				await this._categoriesRepository.search(catid)

			if (_.isArray(response)) {
				await this._redisSystem.setCache(cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: _.size(response),
				response: response as CategoryModel[]
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
