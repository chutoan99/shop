import EnvConfig from './env.config'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Telegraf } = require('telegraf')

export function connectTeleGram() {
	const TOKEN = EnvConfig.telegramToken
	const bot = new Telegraf(TOKEN)

	bot.start((ctx: any) => ctx.reply('Welcome'))
	bot.help((ctx: any) => ctx.reply('Send me a sticker'))

	bot.on('sticker', (ctx: any) => ctx.reply('🐶'))

	bot.on('message', async (ctx: any) => {
		const message = ctx.update.message.text
		if (message.match(/hello/)) {
			ctx.reply('Xin chào')
		} else {
			ctx.reply('Hong hiểu...')
		}
	})

	bot.launch()
}
