import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { getAllSuccess } from '../../shared/comment/comment.actions'
import { Comment } from 'src/types/comment.model'
import { environment } from 'src/environments/environment'
import { CommentResponse } from './index.response'
import { AuthService } from 'src/pages/auth/services/auth.service'
@Injectable({
	providedIn: 'root'
})
export class CommentService {
	public total$ = new BehaviorSubject<number>(1)

  constructor(
		private readonly _http: HttpClient,
		private readonly _store: Store,
		private readonly _authService: AuthService,
	) {}

  getAllComment(query: any): Observable<Comment[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: this._authService.getHeader()
			}),
			params: new HttpParams().set('page', query.page).set('limit', query.limit)
		}

		return this._http.get<CommentResponse>(`${environment.BASE_URL}/comment`, httpOptions).pipe(
			tap((res: CommentResponse) => {
				return this.total$.next(res?.totalPage)
			}),
			map((res: any) => {
				this._store.dispatch(getAllSuccess(res.response))
				return res.response
			})
		)
	}


}
