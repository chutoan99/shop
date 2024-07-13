import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, map } from 'rxjs'
import { InfoShopResponse } from './index.response'
import { environment } from 'src/environments/environment'
import { ShopInfor } from 'src/types/inforShop.model'
import { AuthService } from 'src/pages/auth/services/auth.service'
@Injectable({
	providedIn: 'root'
})
export class ShopInfoService {

	constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService
  ) {}

	getInfoShop(): Observable<ShopInfor> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			})
		}
		return this._http.get<InfoShopResponse>(`${environment.BASE_URL}/shops`, httpOptions).pipe(
			map((res: InfoShopResponse) => {
				return res.response
			})
		)
	}

	UpdateInfoShop(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			})
		}
		const payload = {
			is_official_shop: true,
			name: '',
			cover: '',
			status: 1,
			shop_location: '',
			username: '',
			portrait: '',
			description: '',
			country: ''
		}
		return this._http.put<any>(`${environment.BASE_URL}/shops`, payload, httpOptions)
	}
}
