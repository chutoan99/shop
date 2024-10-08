import MESSAGE from '~/@core/contains/message.json'
import BatchListRepository from './batchList.repository'
import { BatchListResponse } from './batchList.response'
import RedisSystem from '~/systems/redis/redis.system'
import _ from 'lodash'
import { LoggerSystem } from '~/systems/logger'
import { BatchListModel } from './batchList.model'

interface IBatchListService {
	findBatchList(): Promise<BatchListResponse>
}
export default class BatchListService implements IBatchListService {
	protected cacheKey: string = 'batchList'
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _batchListRepository: BatchListRepository

	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._batchListRepository = new BatchListRepository()
	}

	public findBatchList = async (): Promise<BatchListResponse> => {
		try {
			const cachedData: BatchListModel[] =
				await this._redisSystem.getCache(this.cacheKey)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: _.size(cachedData),
					response: cachedData
				}
			}
			const response: BatchListModel[] =
				await this._batchListRepository.findAll()

			if (_.isArray(response)) {
				await this._redisSystem.setCache(this.cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: _.size(response),
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
