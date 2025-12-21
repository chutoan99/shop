import { BaseModel } from '@core/model'
import { Exclude, Expose, Transform } from 'class-transformer'

export class ProductModel extends BaseModel {
	@Expose()
	id!: number

	@Expose()
	shopId!: number

	@Expose()
	categoryId!: number

	@Expose()
	videoId!: null | string

	@Expose()
	promotionId!: number | null

	@Expose()
	discountId!: number

	@Expose()
	currency!: string

	@Expose()
	stock!: number

	@Expose()
	status!: number

	@Expose()
	sold!: number

	@Expose()
	likedCount!: number

	@Expose()
	commentCount!: number

	@Expose()
	discount!: string

	@Expose()
	rawDiscount!: number

	@Expose()
	sizeChart!: null

	@Expose()
	shopName!: string

	@Expose()
	description!: null

	@Expose()
	transparentBackgroundImage!: null | string

	@Expose()
	images!: string

	@Expose()
	viewCount!: number

	@Expose()
	name!: string

	@Expose()
	@Transform(({ value }) => (typeof value === 'string' ? `https://cf.shopee.vn/file/${value}` : value))
	image: string = ''

	@Expose()
	price!: number

	@Expose()
	priceMin!: number

	@Expose()
	priceMax!: number

	@Expose()
	historicalSold!: number

	@Expose()
	priceBeforeDiscount!: number

	@Expose()
	priceMinBeforeDiscount!: number

	@Expose()
	priceMaxBeforeDiscount!: number

	@Expose()
	shopRating!: number

	@Expose()
	filename!: null

	@Expose()
	liked!: boolean

	@Expose()
	isOfficialShop!: boolean

	@Expose()
	isServiceByShop!: boolean

	@Expose()
	showFreeShipping!: boolean

	@Expose()
	attributes!: string

	@Expose()
	isActive!: boolean

	@Expose()
	createdAt!: Date

	@Expose()
	updatedAt!: Date

	isChecked: boolean = false;
}
