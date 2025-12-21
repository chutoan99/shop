import { AppError } from './error'

export enum ErrorCodes {
	SUCCESS = 0,
	VALIDATION_ERROR = 1,
	NOT_FOUND = 2,
	SERVER_ERROR = 3
}

export type Feature = 'user' | 'post' | 'order' | 'shop'
export type ErrorType =
	| 'too-many-requests'
	| 'not-found'
	| 'validation-error'
	| 'is-ready-exists'
export type ErrorCode = `${Feature}:${ErrorType}`

export class ErrorHelper {
	private static readonly messages: Partial<Record<ErrorCode, string>> = {
		'order:too-many-requests': 'Too many requests for orders',
		'post:too-many-requests': 'Too many requests for posts',
		'user:too-many-requests': 'Too many requests for users',
		'user:not-found': 'User is not found',
		'user:is-ready-exists': 'User is is already in exists',
		'shop:not-found': 'Shop is not found'
	}

	static getErrorMessage(errorCode: ErrorCode): string {
		return this.messages[errorCode] ?? 'Unknown error'
	}

	static has(errorCode: ErrorCode): boolean {
		return errorCode in this.messages
	}

	static list(): Partial<Record<ErrorCode, string>> {
		return { ...this.messages }
	}
}
