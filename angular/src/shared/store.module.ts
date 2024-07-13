import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { commentReducer } from './comment/comment.reducer'
import { productReducer } from './product/product.reducer'
import { inforShopReducer } from './inforShop/inforShop.reducer'
import { OrderReducer } from './order/order.reducer'
@NgModule({
	imports: [
		StoreModule.forFeature('comment', commentReducer),
		StoreModule.forFeature('product', productReducer),
		StoreModule.forFeature('inforShop', inforShopReducer),
		StoreModule.forFeature('order', OrderReducer)
	]
})
export class CoreModule {}
