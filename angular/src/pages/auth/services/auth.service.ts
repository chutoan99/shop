import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { AuthResponse } from '../modules/login/interfaces/login.response'
import LoginDto from '../modules/login/interfaces/login.Dto'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _enPoint = environment.BASE_URL
	public isLogout$ = new BehaviorSubject<Boolean>(false)

	constructor(
		private readonly _http: HttpClient,
		private _router: Router
	) {}

	public login(payload: LoginDto): Observable<any> {
		const options = {
			headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
		}
		return this._http.post<AuthResponse>(`${this._enPoint}/auth/login`, payload, options)
	}

	public GetShops(): Observable<any> {
		return this._http.get<any>(`${this._enPoint}/shops/`).pipe(
			map((res: any) => {
				return res.response
			})
		)
	}

	public getHeader() {
		return 'Bearer ' + localStorage.getItem('shopee-token')
	}

	public saveToken(token: string) {
		localStorage.setItem('shopee-token', token)
	}

	public getToken() {
		return localStorage.getItem('shopee-token')
	}

	public deleteToken() {
		localStorage.removeItem('shopee-token')
	}

	public ogout() {
		localStorage.removeItem('shopee-token')
		this.isLogout$.next(true)
		this._router.navigate(['/login'])
	}
}
