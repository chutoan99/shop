import { Component } from '@angular/core'
import { Product } from 'src/types/product.model'
import { Observable, of } from 'rxjs'
import { AppState } from 'src/shared/app.state'
import { ProductService } from 'src/services/product/index.service'

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
	dataSources$!: Observable<Product[]>
	loading = false
	query = {
		page: 1,
		limit: 96
	}
	getNumber(discount: String) {
		let xx: Number = +discount.replace(/[^0-9]/g, '')
		let resuft: boolean = false
		if (xx === 50) {
			resuft = true
		} else {
			resuft = false
		}
		return resuft
	}
	ngOnInit(): void {
		this.productService.getAllProduct(this.query).subscribe((data: Product[]) => {
			this.dataSources$ = of(data)
		})
	}

	constructor(private productService: ProductService) {}
}
