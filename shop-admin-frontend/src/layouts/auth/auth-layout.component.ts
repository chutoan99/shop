import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-auth-layout',
	templateUrl: './auth-layout.template.html',
	styleUrls: ['./auth-layout.style.scss'],
	host: {
		'[class.app-auth-layout]': 'true'
	},
	imports: [CommonModule, RouterModule]
})
export class AuthLayoutComponent {}
