import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@modules/auth/login/services'
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs'
import { MessModel } from '../models'
import { ApiService } from '@core/services'
import { RoomService } from './room.service'
import { MessPaginationAdapter } from '../models/mess-pagination-adapter.model copy'

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	static MESSAGE = `${RoomService.ROOM_DETAIL}/mess`

	public total$ = new BehaviorSubject<number>(1)
	constructor(private readonly _httpClient: HttpClient) {}

	public getMess(id: number): Observable<MessModel[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			})
		}

		return this._httpClient.get(ApiService.getEndpoint(ChatService.MESSAGE, { roomId: id }), httpOptions).pipe(
			tap((res: any) => {
				return this.total$.next(res.total)
			}),
			map((data) => {
				const items = new MessPaginationAdapter(data).response
				return items
			}),
			catchError((error) => throwError(() => error))
		)
	}
}
