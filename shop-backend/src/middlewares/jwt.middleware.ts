import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import dotenv from 'dotenv'
import { AuthenticatedRequest, BaseErrors, ROLE } from '@core/index'
import EnvConfig from '@configs/env.config'
dotenv.config()

export class JwtMiddlewares {
	public static verifyToken = (
		req: Request,
		res: Response,
		next: NextFunction
	): Response<any, Record<string, any>> | undefined => {
		const token = req.headers.authorization
		if (!token)
			return BaseErrors.notUnauthorized('Require authorization', res)
		const accessToken = token.split(' ')[1]
		const secretKeyString = EnvConfig.app.secretKey as string
		const secret = Buffer.from(secretKeyString, 'base64')
		jwt.verify(
			accessToken,
			secret as jwt.Secret,
			(err: any, decode: any) => {
				if (err) {
					const isChecked = err instanceof jwt.TokenExpiredError
					if (!isChecked)
						return BaseErrors.notUnauthorized(
							'Access token invalid',
							res
						)
					if (isChecked)
						return BaseErrors.notUnauthorized(
							'Access token expired',
							res
						)
				}
				req.user = decode
				next()
			}
		)
	}

	public static isAdmin = (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): Response<any, Record<string, any>> | undefined => {
		const { role } = req.user
		if (role !== ROLE.ADMIN)
			return BaseErrors.notUnauthorized('Require role shop_Admin', res)
		req.shop = req.user
		next()
	}
}
