import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@Component({
	standalone: true,
	selector: 'app-permission-management',
	templateUrl: '../templates/permission-management.template.html',
	styleUrls: ['../styles/permission-management.style.scss'],
	host: {
		'[class.app-permission-management]': 'true'
	},
	imports: [CommonModule, RouterModule, FormsModule]
})
export class PermissionManagementComponent {}
