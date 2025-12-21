import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@modules/auth/login/services'
import { Store } from '@ngrx/store'
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs'
import { CommentModel } from '../models'
import { getAllCommentSuccess } from '../store/actions'
import CommentDto from '../dtos/comment.dto'
import { CommentPaginationAdapter } from '../models/comment-pagination-adapter.model'
import { ApiService } from '@core/services'

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	static COMMENTS = 'posts/:postId/comments'

	public total$ = new BehaviorSubject<number>(1)

	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _store: Store
	) {}

	getCommentByPostId(postId: number, query: CommentDto): Observable<CommentModel[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: AuthService.getHeader()
			}),
			params: new HttpParams().set('page', query.page - 1).set('limit', query.limit)
		}
		return this._httpClient
			.get(ApiService.getEndpoint(CommentService.COMMENTS, { postId: postId }), httpOptions)
			.pipe(
				tap((res: any) => {
					return this.total$.next(res.total)
				}),
				map((data) => {
					const items = new CommentPaginationAdapter(data).response
					this._store.dispatch(getAllCommentSuccess({ comments: items }))
					return items
				}),
				catchError((error) => throwError(() => error))
			)
	}
}
