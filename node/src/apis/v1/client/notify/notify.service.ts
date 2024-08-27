import MESSAGE from '~/@core/contains/message.json'
import { NotifyResponse } from './notify.response'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import _ from 'lodash'
import { NotifyModel } from './notify.model'
import MysqlNotifyRepository from './repositories/notify.repository.mysql'
import MssqlNotifyRepository from './repositories/notify.repository.mssql'

interface INotifyService {
	findNotifies(): Promise<NotifyResponse>
}
export default class NotifyService implements INotifyService {
	protected cacheKey: string = 'notify'
	private readonly _redisSystem: RedisSystem
	private readonly _loggerSystem: LoggerSystem
	private readonly _mysqlNotifyRepository: MysqlNotifyRepository
	private readonly _mssqlNotifyRepository: MssqlNotifyRepository

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._redisSystem = new RedisSystem()
		this._mysqlNotifyRepository = new MysqlNotifyRepository()
		this._mssqlNotifyRepository = new MssqlNotifyRepository()
	}

	findNotifies = async (): Promise<NotifyResponse> => {
		try {
			const cachedData = await this._redisSystem.getCache(this.cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: _.size(cachedData),
					response: cachedData
				}
			}

			const response: NotifyModel[] | [] =
				await this._mysqlNotifyRepository.findAll()

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
