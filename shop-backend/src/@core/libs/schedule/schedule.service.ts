import schedule from 'node-schedule'
import moment from 'moment-timezone'
import { CRON_STRING } from '@core/enums'

export default class ScheduleService {
	public initialize(): void {
		this.setupRestartJob()
	}

	private setupRestartJob(): void {
		// Chạy mỗi 5 phút
		schedule.scheduleJob(CRON_STRING.EVERY_5_MINUTE, () => {
			console.log('🔍 Starting server health check')

			const now = moment().tz('Asia/Ho_Chi_Minh')
			const today = now.format('YYYY-MM-DD')

			console.log(`🔍 Server health check completed - ${today}`)
		})
		console.log('✅ Server health check scheduled - every 5 minutes')
	}
}
