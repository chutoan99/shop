import {
	IsArray,
	IsNumber,
	IsObject,
	IsOptional,
	IsString
} from 'class-validator'
import { UserModel } from '../../user/models'
import { PostBaseModel } from '../../post/models'
import { variationDto } from '../../cart/dtos'
export class OrderItem {
	@IsNumber()
	item_id!: number

	@IsNumber()
	price!: number

	@IsNumber()
	amount!: number

	@IsOptional()
	@IsObject()
	post!: PostBaseModel

	@IsArray()
	@IsOptional()
	variation!: [variationDto] | []
}

export class MetadataOrder {
	@IsNumber()
	shop_id!: number

	@IsString()
	shop_name!: string

	@IsString()
	note!: string

	@IsArray()
	@IsOptional()
	items!: OrderItem[]
}

export class CreateOrderDto {
	@IsNumber()
	final_total!: number

	@IsNumber()
	ship_cost!: number

	@IsNumber()
	total_num_items!: number

	@IsObject()
	user!: UserModel

	@IsArray()
	@IsOptional()
	metadata!: MetadataOrder[]
}
