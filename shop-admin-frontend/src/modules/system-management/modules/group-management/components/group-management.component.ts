import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@Component({
	standalone: true,
	selector: 'app-group-management',
	templateUrl: '../templates/group-management.template.html',
	styleUrls: ['../styles/group-management.style.scss'],
	host: {
		'[class.app-group-management]': 'true'
	},
	imports: [CommonModule, RouterModule, FormsModule]
})
export class GroupManagementComponent {}
