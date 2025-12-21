import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AuthService } from '@modules/auth/login/services'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class AppGuard implements CanActivate {
	constructor(private readonly _router: Router) {}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const token = AuthService.getToken()
		if (token == null) return this._router.parseUrl('/login')
		return true
	}
}
