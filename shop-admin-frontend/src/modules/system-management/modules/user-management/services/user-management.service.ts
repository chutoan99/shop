import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@modules/auth/login/services'
import { Store } from '@ngrx/store'
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs'
import { ApiService } from '@core/services'
import { AccountInfoModel } from '@modules/account/models'

export interface BaseResponse {
	err: number
	msg: string
}
@Injectable({
	providedIn: 'root'
})
export class UserManagementService {
	static USERS = ':shopId/users'
	static INVITE = ':shopId/invite'
	static ACCEPT_INVITATION = 'invitations/:token/accept'
	static UPDATE_ROLE = ':shopId/users/:targetUserId/role'
	static REMOVE_USER = ':shopId/users/:targetUserId'

	public total$ = new BehaviorSubject<number>(1)

	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _store: Store
	) {}

	getUsers(shopId: number, page = 1, limit = 20): Observable<AccountInfoModel[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			}),
			params: new HttpParams().set('page', page - 1).set('limit', limit)
		}

		return this._httpClient.get(ApiService.getEndpoint(UserManagementService.USERS, { shopId }), httpOptions).pipe(
			tap((res: any) => this.total$.next(res.total ?? 0)),
			map((res: any) => res.data ?? []),
			catchError((error) => throwError(() => error))
		)
	}

	inviteUser(shopId: number, payload: { email: string; role: string }): Observable<BaseResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			})
		}

		return this._httpClient
			.post<BaseResponse>(ApiService.getEndpoint(UserManagementService.INVITE, { shopId }), payload, httpOptions)
			.pipe(catchError((error) => throwError(() => error)))
	}

	acceptInvitation(token: string): Observable<BaseResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			})
		}

		return this._httpClient
			.post<BaseResponse>(
				ApiService.getEndpoint(UserManagementService.ACCEPT_INVITATION, { token }),
				{},
				httpOptions
			)
			.pipe(catchError((error) => throwError(() => error)))
	}

	removeUser(shopId: number, targetUserId: number): Observable<BaseResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			})
		}

		return this._httpClient
			.delete<BaseResponse>(
				ApiService.getEndpoint(UserManagementService.REMOVE_USER, {
					shopId,
					targetUserId
				}),
				httpOptions
			)
			.pipe(catchError((error) => throwError(() => error)))
	}

	updateUserRole(shopId: number, targetUserId: number, payload: { role: string }): Observable<BaseResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			})
		}

		return this._httpClient
			.put<BaseResponse>(
				ApiService.getEndpoint(UserManagementService.UPDATE_ROLE, {
					shopId,
					targetUserId
				}),
				payload,
				httpOptions
			)
			.pipe(catchError((error) => throwError(() => error)))
	}
}
