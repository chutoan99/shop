import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { InfoAccountState, infoShopReducer } from '@modules/account/store/reducers'
import { commentReducer, productReducer, ProductState } from '@modules/product/store/reducers'

export interface AppState {
	feature_product: ProductState
	feature_infoAccount: InfoAccountState
	feature_comment: ProductState
}

@NgModule({
	imports: [
		StoreModule.forFeature('product', productReducer),
		StoreModule.forFeature('comment', commentReducer),
		StoreModule.forFeature('infoAccount', infoShopReducer)
	]
})
export class StoreClientModule {}
