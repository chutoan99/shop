export enum CRON_STRING {
	EVERY_SECOND = '*/1 * * * * *',
	EVERY_2_SECOND = '*/2 * * * * *',
	EVERY_5_SECOND = '*/5 * * * * *',
	EVERY_30_MINUTE = '*/30 * * * *',
	EVERY_5_MINUTE = '*/5 * * * *',
	EVERY_MINUTE = '* * * * *',
	EVERY_HOUR = '0 * * * *',
	EVERY_DAY = '0 0 * * *',
	EVERY_WEEK = '0 0 * * 0',
	EVERY_MONTH = '0 0 1 * *',
	EVERY_3_HOUR = '0 */3 * * *',
	EVERY_5_HOUR = '0 */5 * * *',
	EVERY_12_HOUR = '0 */12 * * *'
}
