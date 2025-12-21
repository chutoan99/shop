import { BaseModel, IBaseModel } from '@core/interfaces'
import { Expose, Type } from 'class-transformer'
import { ShopBaseModel } from './shop.model'

export interface IRoomModel extends IBaseModel {
	_id: string
	roomId: number
	userId: number
	shopId: number
	type: string
	isActive: boolean
	created_at: Date
	updated_at: Date | null
}

export class RoomModel extends BaseModel implements IRoomModel {
	@Expose()
	_id!: string

	@Expose()
	roomId!: number

	@Expose()
	userId!: number

	@Expose()
	shopId!: number

	@Expose()
	type!: string

	@Expose()
	isActive!: boolean

	@Expose()
	created_at!: Date

	@Expose()
	updated_at!: Date | null
}

export interface IRoomExtra extends IRoomModel {
	shop: ShopBaseModel
}

export class RoomExtra extends RoomModel implements IRoomExtra {
	@Expose()
	@Type(() => ShopBaseModel)
	shop!: ShopBaseModel
}
