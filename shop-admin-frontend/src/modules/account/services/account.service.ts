import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs'
import { AuthService } from '@modules/auth/login/services'
import AccountDto from '../dtos/account.dto'
import { Store } from '@ngrx/store'
import { AccountInfoModel, AccountPaginationAdapter } from '../models'
import { ApiService } from '@core/services'
import { DetailResponseModel } from '@core/model'

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	static ACCOUNT_SAMPLE = 'accounts-trial'
	static ACCOUNT_ME = 'shops/setting'

	public total$ = new BehaviorSubject<number>(1)
	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _store: Store
	) {}

	getAccountsSample(query: AccountDto): Observable<AccountInfoModel[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: new HttpParams().set('page', query.page).set('limit', query.limit)
		}
		return this._httpClient.get(ApiService.getEndpoint(AccountService.ACCOUNT_SAMPLE), httpOptions).pipe(
			tap((res: any) => {
				return this.total$.next(res.total)
			}),
			map((data) => {
				return new AccountPaginationAdapter(data).response
			}),
			catchError((error) => throwError(() => error))
		)
	}

	public getCurrentInfo(): Observable<AccountInfoModel> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			})
		}
		return this._httpClient
			.get<DetailResponseModel<AccountInfoModel>>(ApiService.getEndpoint(AccountService.ACCOUNT_ME), httpOptions)
			.pipe(
				map((data: DetailResponseModel<AccountInfoModel>) => {
					return AccountInfoModel.fromJson(data.response)
				}),
				catchError((error) => throwError(() => error))
			)
	}
}
