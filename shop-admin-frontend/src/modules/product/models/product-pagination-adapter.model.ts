import { PaginationAdapter } from '@core/adapters/pagination.adapter'
import { ProductModel } from './product.model'

export class ProductPaginationAdapter extends PaginationAdapter<ProductModel> {
	constructor(data: any) {
		data.response = data.response.map((item: any) => ProductModel.fromJson(item))
		super(data)
	}
}
