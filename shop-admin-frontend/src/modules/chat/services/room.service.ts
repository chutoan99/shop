import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@modules/auth/login/services'
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs'
import { RoomModel } from '../models'
import { ApiService } from '@core/services'
import { RoomPaginationAdapter } from '../interfaces/room-pagination-adapter.model'

@Injectable({
	providedIn: 'root'
})
export class RoomService {
	static ROOM = 'room'
	static ROOM_DETAIL = 'room/:roomId'

	public total$ = new BehaviorSubject<number>(1)

	constructor(private readonly _httpClient: HttpClient) {}

	public getRooms(): Observable<RoomModel[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			}),
			params: new HttpParams().set('type', 'admin')
		}

		return this._httpClient.get(ApiService.getEndpoint(RoomService.ROOM), httpOptions).pipe(
			tap((res: any) => {
				return this.total$.next(res.total)
			}),
			map((data) => {
				const items = new RoomPaginationAdapter(data).response
				return items
			}),
			catchError((error) => throwError(() => error))
		)
	}

	public getRoomDetail(id: number): Observable<RoomModel> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			}),
			params: new HttpParams().set('type', 'admin')
		}

		return this._httpClient.get(ApiService.getEndpoint(RoomService.ROOM_DETAIL, { roomId: id }), httpOptions).pipe(
			map((res: any) => {
				return RoomModel.fromJson(res.response)
			}),
			catchError((error) => throwError(() => error))
		)
	}
}
