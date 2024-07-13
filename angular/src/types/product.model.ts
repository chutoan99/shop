export interface Product {
	id: number
	itemid: number
	shopid: number
	catid: number
	name: string
	image: string
	historical_sold: number
	price: number
	price_min: number
	stock: number
	price_max: number
	price_before_discount: number
	price_min_before_discount: number
	price_max_before_discount: number
	discount: string
	shop_rating: number
	filename: null
	shop_name: string
	liked: number
	ctime: Date
	show_free_shipping: number
	is_official_shop: number
	is_service_by_shopee: number
	createdAt: Date
	updatedAt: Date
}
