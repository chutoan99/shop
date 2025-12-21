import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@modules/auth/login/services'
import { LoginResponse } from '../interfaces'
import { AccountInfoModel } from '@modules/account/models'
import {} from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import LoginDto from '../dtos/login.dto'

@Component({
	selector: 'app-login-form',
	templateUrl: '../templates/login-form.template.html',
	styleUrls: ['../styles/login-form.style.scss'],
	host: {
		'[class.app-login-form]': 'true'
	},
	imports: [CommonModule, FormsModule]
})
export class LoginFormComponent implements OnChanges {
	@Input() public shop = new AccountInfoModel()
	protected payload = new LoginDto()

	constructor(
		private readonly _authService: AuthService,
		private readonly router: Router
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['shop'].currentValue) {
			this.shop = changes['shop'].currentValue
			this.payload.email = `admin${this.shop?.userId}@yopmail.com`
			this.payload.password = `${this.shop?.username}${this.shop?.userId}`
		}
	}

	protected handleSubmit() {
		this._authService.login(this.payload).subscribe((res: LoginResponse) => {
			const token = res.token
			if (token) {
				AuthService.saveToken(token)
				this.router.navigateByUrl('/')
			}
		})
	}
}
