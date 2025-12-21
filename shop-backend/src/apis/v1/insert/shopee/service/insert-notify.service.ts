import axios from 'axios'
import LoggerService from '@core/libs/logger/logger.system'
import EnvConfig from '@configs/env.config'
import { NotifyModel } from '../import'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'

export default class InsertNotifyService {
	private _endPoint: string = EnvConfig.server.urlData!

	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _rabbitMqService: RabbitMqService
	) {}

	public insert = async () => {
		try {
			const response = await this._fetchData()
			this._processData(response)
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	private async _fetchData(): Promise<any[]> {
		const response = await axios.get(
			`${this._endPoint}/common/notify/notify.json`
		)
		return response.data || []
	}

	private _processData(data: any[]): void {
		data?.forEach((item: any) => {
			const newNotify = new NotifyModel({
				userId: item?.userid,
				image: item?.image,
				title: item?.title,
				content: item?.content,
				seen: item?.seen
			})

			newNotify.save()
		})
	}
}
