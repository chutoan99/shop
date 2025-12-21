import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components'
import { AppGuard } from 'app/app.guard'

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AppGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}
