import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'

@Injectable({
	providedIn: 'root'
})
export class UserManagementResolver implements Resolve<any> {
	constructor(private readonly _router: Router) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {}
}
