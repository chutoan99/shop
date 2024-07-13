import { BaseModel } from '../../../@core/interfaces'

export interface CartModel extends BaseModel {
	id: number
	userid: number
	itemid: number
	shopid: number
	amount: number
	tierVariation: string
	item_option: string
	overview: {
		name: string
		catid: number
		image: string
		liked: number
		price: number
		stock: number
		images?: string[] | null
		itemid: number
		shopid: number
		discount: string
		filename?: null
		price_max: number
		price_min: number
		shop_name: string
		shop_rating: number
		historical_sold: number
		is_official_shop: number
		is_service_by_shop: number
		show_free_shipping: number
		name_tierVariations: string
		images_tierVariations?: string[] | null
		option_tierVariations?: string[] | null
		price_before_discount: number
		price_max_before_discount: number
		price_min_before_discount: number
	}
}
