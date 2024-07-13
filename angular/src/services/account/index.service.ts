import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { AccountResponse } from './index.response'
import { ShopAccount } from 'src/types/account.model'
import { Observable, map } from 'rxjs'
import { AuthService } from 'src/pages/auth/services/auth.service'
@Injectable({
	providedIn: 'root'
})
export class AccountService {
	constructor(
		private readonly _http: HttpClient,
		private readonly _authService: AuthService
	) {}

	getAccount(): Observable<ShopAccount> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			})
		}
		return this._http.get<AccountResponse>(`${environment.BASE_URL}/shops`, httpOptions).pipe(
			map((res: AccountResponse) => {
				return res.response
			})
		)
	}

	UpdateAccount() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			})
		}
		const payload = {
			email: '',
			sex: 0,
			name: '',
			address: '',
			birthday: '',
			phone: 0
		}
		return this._http.put<any>(`${environment.BASE_URL}/userInfo/account`, payload, httpOptions)
	}
}
