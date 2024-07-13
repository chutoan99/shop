import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/pages/auth/services/auth.service'

@Injectable({
	providedIn: 'root'
})
export class AppGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const token = this._authService.getToken()
		if (token == null) return this._router.parseUrl('/login')
		return true
	}
}
