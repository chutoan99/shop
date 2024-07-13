import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, map, Observable, tap, catchError } from 'rxjs'
import { Store } from '@ngrx/store'
import { getAllSuccess } from 'src/shared/product/product.actions'

import { environment } from 'src/environments/environment'
import { Product } from 'src/types/product.model'
import { ProductResponse } from './index.response'
import { AuthService } from 'src/pages/auth/services/auth.service'

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	public total$ = new BehaviorSubject<number>(1)
	constructor(
		private readonly _http: HttpClient,
		private readonly _store: Store,
		private readonly _authService: AuthService,
	) {}

	getAllProduct(query: any): Observable<Product[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			}),
			params: new HttpParams().set('page', query.page).set('limit', query.limit)
		}
		return this._http.get<ProductResponse>(`${environment.BASE_URL}/product`, httpOptions).pipe(
			tap((res: ProductResponse) => {
				return this.total$.next(res.response.count)
			}),
			map((res: any) => {
				this._store.dispatch(getAllSuccess(res.response.rows))
				return res.response.rows
			})
		)
	}


}
