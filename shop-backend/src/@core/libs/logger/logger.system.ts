import expressWinston from 'express-winston'
import winston, { Logger, transports, format, Logform } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
import fs from 'fs'
import { getCurrentDate } from '@helpers/date.helper'

export default class LoggerService {
	private static _instance: LoggerService | null = null
	private _logger: Logger | null = null
	private logDirectory: string

	constructor() {
		// Initialize log directory based on the current date
		this.logDirectory = path.join(
			__dirname,
			'../../../../@log',
			getCurrentDate()
		)
		this._createLogDirectory(this.logDirectory)
		this._initializeLogger()
	}

	public getLogger(): Logger | null {
		return this._logger
	}

	public static getInstance(): LoggerService {
		if (!this._instance) {
			this._instance = new LoggerService()
		}
		return this._instance
	}

	public info(message: string, meta?: any): void {
		this._ensureLoggerInitialized()
		this._logger!.info(message?.replace(/\s+/g, ' ')?.trim(), meta)
	}

	public error(message: string, meta?: any): void {
		this._ensureLoggerInitialized()
		this._logger!.error(message, meta)
	}

	public debug(message: string, meta?: any): void {
		this._ensureLoggerInitialized()
		this._logger!.debug(message?.replace(/\s+/g, ' ')?.trim(), meta)
	}

	public warn(message: string, meta?: any): void {
		this._ensureLoggerInitialized()
		this._logger!.warn(message?.replace(/\s+/g, ' ')?.trim(), meta)
	}

	private _initializeLogger(): void {
		if (!this._logger) {
			this._logger = winston.createLogger({
				format: winston.format.combine(
					winston.format.splat(),
					winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
					winston.format.colorize(),
					winston.format.errors({ stack: true }),
					winston.format.printf(
						(log: winston.Logform.TransformableInfo) => {
							if (log.stack)
								return `[${log.timestamp}] [${log.level}] ${log.stack}`
							return `[${log.timestamp}] [${log.level}] ${log.message}`
						}
					)
				),
				transports: [
					new winston.transports.Console(),
					new DailyRotateFile({
						filename: `${this.logDirectory}/info/logfile-%DATE%.log`,
						datePattern: 'YYYY-MM-DD',
						zippedArchive: true,
						maxSize: '20m',
						maxFiles: '14d'
					})
				]
			})
		}
	}

	private _createLogDirectory(directory: string): void {
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true })
		}
	}

	private _ensureLoggerInitialized(): void {
		if (!this._logger) {
			throw new Error('Winston logger is not initialized.')
		}
	}

	public getRequestLoggerMiddleware() {
		return expressWinston.logger({
			winstonInstance: this.getLogger()!,
			statusLevels: true
		})
	}

	public getErrorLoggerMiddleware() {
		return expressWinston.errorLogger({
			transports: [
				new transports.File({
					level: 'error',
					filename: `${this.logDirectory}/error/logsInternalErrors.log`
				})
			],
			format: format.combine(
				format.json(),
				format.timestamp(),
				format.printf((log: Logform.TransformableInfo) => {
					if (log.stack)
						return `[${log.timestamp}] [${log.level}] ${log.stack}`
					return `[${log.timestamp}] [${log.level}] ${log.message}`
				})
			)
		})
	}
}

// //* level: Allows logging for levels lower or equal to the configured level based on predefined levels.
// //* levels: Default levels with corresponding colors can be customized.
// //* transport: Defines how the logger logs.
// //* format: Adjusts log formatting settings.
