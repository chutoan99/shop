import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { DiscountPipe } from './product.pipe'
import { ModalComponent } from './components/modal/modla.component'
import { ProductComponent } from './product.component'

import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzRateModule } from 'ng-zorro-antd/rate'
import { ProductListComponent } from './components/product-list/product-list.component'
@NgModule({
	declarations: [DiscountPipe, ModalComponent, ProductComponent, ProductListComponent],
	imports: [
		NzRateModule,
		NzDropDownModule,
		NzPaginationModule,
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		RouterModule
	]
})
export class ProductModule {}
