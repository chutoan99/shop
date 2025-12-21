import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'
import { ProductService } from '../services'
import ProductDto from '../dtos/product.dto'
import { catchError, tap, throwError } from 'rxjs'
import { ProductPaginationAdapter } from '../models/product-pagination-adapter.model'

@Injectable({
	providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {
	constructor(
		private readonly _router: Router,
		private _productService: ProductService
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const productDto = new ProductDto()
		return this._productService.search(productDto).pipe(
			tap((products) => {
				if (products.length > 0) {
					setTimeout(() => {
						this._router.navigate(['/products'], {
							queryParams: {
								page: productDto.page,
								limit: productDto.limit
							},
							queryParamsHandling: 'merge'
						})
					})
				}
			}),
			catchError((error) => throwError(() => error))
		)
	}
}
