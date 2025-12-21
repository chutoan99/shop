import { Request } from 'express'
import { ParsedQs } from 'qs'
import { ShopModel } from '@shop/models'
import { UserModel } from '@user/models'

export interface AuthenticatedRequest<
	P = any,
	ResBody = any,
	ReqBody = any,
	ReqQuery = ParsedQs,
	Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
	user: Partial<UserModel>
	shop: Partial<ShopModel>
	files: any
	cookie: any
}
