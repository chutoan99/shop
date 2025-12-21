import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@modules/auth/login/services'
import { Store } from '@ngrx/store'
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs'
import ProductDto from '../dtos/product.dto'
import { getAllProductSuccess } from '../store/actions'
import { ProductModel } from '../models'
import { ProductPaginationAdapter } from '../models/product-pagination-adapter.model'
import { ApiService } from '@core/services'
export interface BasePostResponse {
	err: number
	msg: string
}
@Injectable({
	providedIn: 'root'
})
export class ProductService {
	static POSTS = 'posts'
	static POST_DETAIL = 'posts/:postId'

	public total$ = new BehaviorSubject<number>(1)

	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _store: Store
	) {}

	search(query: ProductDto): Observable<ProductModel[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			}),
			params: new HttpParams().set('page', query.page - 1).set('limit', query.limit)
		}
		return this._httpClient.get(ApiService.getEndpoint(ProductService.POSTS), httpOptions).pipe(
			tap((res: any) => {
				return this.total$.next(res.total)
			}),
			map((data) => {
				const items = new ProductPaginationAdapter(data).response
				this._store.dispatch(getAllProductSuccess({ products: items }))
				return items
			}),
			catchError((error) => throwError(() => error))
		)
	}

	/**
	 * @param {string} id
	 * @return {Observable<BasePostResponse>}
	 */
	public deleteProducts(id: number): Observable<BasePostResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}

		return this._httpClient
			.delete<BasePostResponse>(ApiService.getEndpoint(ProductService.POSTS, { postId: id }), httpOptions)
			.pipe(
				map((res) => res),
				catchError((error) => throwError(() => error))
			)
	}
}
