import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { getAllFailed } from '../../shared/order/order.actions'
import { environment } from 'src/environments/environment'
import { OrderResponse } from './index.response'
import { AuthService } from 'src/pages/auth/services/auth.service'
@Injectable({
	providedIn: 'root'
})
export class OrderService {
	public total$ = new BehaviorSubject<number>(1)

  constructor(
		private readonly _http: HttpClient,
		private readonly _store: Store,
		private readonly _authService: AuthService,
	) {}

	getAllOrder(query: any): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			}),
			params: new HttpParams().set('page', query.page).set('limit', query.limit)
		}
		return this._http.get<OrderResponse>(`${environment.BASE_URL}/order`, httpOptions).pipe(
			tap((res: OrderResponse) => {
				// return this.total$.next(res.response.count);
			}),
			map((res: any) => {
				// this.store.dispatch(getAllSuccess(res.response.rows));
				// return res.response.rows;
			}),
			catchError((err) => {
				this._store.dispatch(getAllFailed(err))
				return throwError(err)
			})
		)
	}

}
