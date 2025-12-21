import { Expose, Type } from 'class-transformer'
import { IPostBaseModel, PostBaseModel } from './post-base.model'
import { IShopModel, ShopModel } from './shop.model'

export interface VariationModel {
	name: string
	type: number
	images: string[]
	options: string[]
	properties: any[]
}

export interface IVoucherModel {
	id: number
	label: string
	voucher_code: string
}

export interface ICategoryModel {
	id: number
	level: number
	images: string
	parent_cat_id?: number | null
	category_name: string
}

export interface IProductDetailModel extends IPostBaseModel {
	discountid: number
	currency: string
	status: number
	sold: number
	liked_count: number
	cmt_count: number
	raw_discount: number
	description: string | null
	view_count: number
	images: string[]
	size_chart: string
	deep_discount_skin?: string | null
	video?: string | null
	shop_info: IShopModel | null
	variations: VariationModel[]
	voucher: IVoucherModel | null
	category?: ICategoryModel | null
}

export class ProductDetailModel extends PostBaseModel {
	@Expose()
	discountid!: number

	@Expose()
	currency!: string

	@Expose()
	status!: number

	@Expose()
	sold!: number

	@Expose()
	liked_count!: number

	@Expose()
	cmt_count!: number

	@Expose()
	raw_discount!: number

	@Expose()
	description!: string | null

	@Expose()
	view_count!: number

	@Expose()
	images!: string[]

	@Expose()
	size_chart!: string

	@Expose()
	deep_discount_skin?: string | null

	@Expose()
	video?: string | null

	@Expose()
	@Type(() => ShopModel)
	shop_info!: ShopModel | null

	@Expose()
	@Type(() => Object)
	variations!: VariationModel[]

	@Expose()
	@Type(() => Object)
	voucher!: IVoucherModel | null

	@Expose()
	@Type(() => Object)
	category?: ICategoryModel | null
}
