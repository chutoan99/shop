import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/pages/auth/services/auth.service'
import { AuthResponse } from '../interfaces'
import LoginDto from '../interfaces/login.Dto'

@Component({
	selector: 'app-login',
	templateUrl: '../templates/login.component.html',
	styleUrls: ['../styles/login.component.scss']
})
export class LoginComponent implements OnInit {
	dataSources$!: Observable<any[]>

	payload: LoginDto = {
		email: '',
		password: ''
	}

	constructor(
		private _authService: AuthService,
		public router: Router
	) {}

	handleSubmit() {
		this._authService.login(this.payload).subscribe((res: AuthResponse) => {
			const token = res.access_token
			if (token) {
				localStorage.setItem('shopid', JSON.stringify(res.response.shopid))
				this._authService.saveToken(token)
				this.router.navigateByUrl('/')
			}
		})
	}

	fetchDataShops() {
		this._authService.GetShops().subscribe((data: any[]) => {
			this.dataSources$ = of(data)
		})
	}

	ngOnInit(): void {
		this.fetchDataShops()
	}
}
