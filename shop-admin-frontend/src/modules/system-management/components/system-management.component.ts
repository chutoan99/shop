import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { UserManagementComponent } from '../modules/user-management/components/user-management.component'
import { GroupManagementComponent } from '../modules/group-management/components/group-management.component'
import { RoleManagementComponent } from '../modules/role-management/components/role-management.component'
import { PermissionManagementComponent } from '../modules/permission-management/components/permission-management.component'

@Component({
	standalone: true,
	selector: 'app-system-management',
	templateUrl: '../templates/system-management.template.html',
	styleUrls: ['../styles/system-management.style.scss'],
	host: {
		'[class.app-system-management]': 'true'
	},
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,

		UserManagementComponent,
		GroupManagementComponent,
		RoleManagementComponent,
		PermissionManagementComponent
	]
})
export class SystemManagementComponent {
	activeTab: 'user' | 'group' | 'role' | 'permission' = 'user'
}
