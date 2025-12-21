import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { LoginResponse } from '../interfaces'
import LoginDto from '../dtos/login.dto'
import { LocalStorageService } from '@core/services/local-storage.service'
import { ApiService } from '@core/services'
import { AppResource } from '@core/resources'
import { ChatService } from '@modules/chat/services'

@Injectable({
	providedIn: 'root'
})
export class AuthService extends ApiService {
	public isLogout$ = new BehaviorSubject<Boolean>(false)
	static LOGIN = 'auth/login'

	constructor(
		private readonly _http: HttpClient,
		private _router: Router
	) {
		super()
	}

	public login(payload: LoginDto): Observable<any> {
		const options = {
			headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
		}
		return this._http.post<LoginResponse>(ApiService.getEndpoint(AuthService.LOGIN), payload, options)
	}

	static getHeader() {
		return 'Bearer ' + LocalStorageService.getItem(AppResource.LOCAL_STORAGE_KEY.ADMIN_TOKEN)
	}

	static saveToken(token: string) {
		LocalStorageService.setItem(AppResource.LOCAL_STORAGE_KEY.ADMIN_TOKEN, token)
	}

	static getToken() {
		return LocalStorageService.getItem(AppResource.LOCAL_STORAGE_KEY.ADMIN_TOKEN)
	}

	static deleteToken() {
		LocalStorageService.removeItem(AppResource.LOCAL_STORAGE_KEY.ADMIN_TOKEN)
	}

	public logout() {
		LocalStorageService.removeItem(AppResource.LOCAL_STORAGE_KEY.ADMIN_TOKEN)
		this.isLogout$.next(true)
		this._router.navigate(['/login'])
	}
}
