import { Injectable } from '@angular/core'
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
	HttpInterceptorFn
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

// @Injectable({ providedIn: 'root' })
// export class ForbiddenInterceptor implements HttpInterceptor {
//   constructor(private readonly _router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log("reqreqreqreq", req)
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 403) {
//           this._router.navigateByUrl('/login');
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }

export const ForbiddenInterceptor: HttpInterceptorFn = (req, next) => {
	console.log('Request URL: ' + req.url)
	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			console.error('Logging Interceptor Functional Error:', error)
			return throwError(() => error)
		})
	)
}
