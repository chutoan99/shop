import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { RoomResponse } from './index.response'
import { environment } from 'src/environments/environment'
import { Room } from 'src/types/room.model'
import { AuthService } from 'src/pages/auth/services/auth.service'

@Injectable({
	providedIn: 'root'
})
export class RoomService {
	constructor(
		private readonly _http: HttpClient,
		private readonly _authService: AuthService
	) {}

	getRooms(): Observable<Room[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			})
		}
		return this._http.get<RoomResponse>(`${environment.BASE_URL}/roomAdmin`, httpOptions).pipe(
			map((res: RoomResponse) => {
				return res.response
			})
		)
	}
}
