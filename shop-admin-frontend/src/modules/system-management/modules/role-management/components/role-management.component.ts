import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@Component({
	standalone: true,
	selector: 'app-role-management',
	templateUrl: '../templates/role-management.template.html',
	styleUrls: ['../styles/role-management.style.scss'],
	host: {
		'[class.app-role-management]': 'true'
	},
	imports: [CommonModule, RouterModule, FormsModule]
})
export class RoleManagementComponent {}
