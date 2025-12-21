import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppGuard } from 'app/app.guard'
import { SystemManagementComponent } from './components/system-management.component'

const routes: Routes = [
	{
		path: '',
		component: SystemManagementComponent,
		canActivate: [AppGuard]
		// resolve: {
		// 	products: UserManagementResolver
		// }
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SystemManagementRoutingModule {}
