import jwt from 'jsonwebtoken'

import EnvConfig from '@configs/env.config'

export class JwtService {
	static generateAccessToken = ({
		userid,
		email,
		role
	}: {
		userid: number
		email: string
		role: string
	}) => {
		const secretKeyString = EnvConfig.app.secretKey as string
		const secret = Buffer.from(secretKeyString, 'base64')

		return jwt.sign({ id: userid, email, role }, secret as jwt.Secret, {
			expiresIn: '1d'
		})
	}

	static generateRefreshToken = ({
		userid,
		email
	}: {
		userid: number
		email: string
	}) => {
		const secretKeyString = EnvConfig.app.secretKey as string
		const secret = Buffer.from(secretKeyString, 'base64')

		return jwt.sign({ id: userid, email }, secret as jwt.Secret, {
			expiresIn: '7d'
		})
	}
}
