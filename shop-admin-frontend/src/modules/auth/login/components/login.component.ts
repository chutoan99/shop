import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AccountInfoModel } from '@modules/account/models'
import { LoginFormComponent } from './login-form.component'
import { LoginShopComponent } from './login-shop.component'
import {} from '@angular/common/http'

@Component({
	selector: 'app-login',
	templateUrl: '../templates/login.template.html',
	styleUrls: ['../styles/login.style.scss'],
	host: {
		'[class.app-login]': 'true'
	},
	imports: [CommonModule, LoginFormComponent, LoginShopComponent]
})
export class LoginComponent {
	protected currentShop = new AccountInfoModel()

	protected chooseShop(shop: AccountInfoModel) {
		this.currentShop = shop
	}
}
