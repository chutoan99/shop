import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from '../dashboard/components'
import { AppGuard } from 'app/app.guard'
import { ShipRouteComponent } from './components'

const routes: Routes = [
	{
		path: '',
		component: ShipRouteComponent,
		canActivate: [AppGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShipRouteRoutingModule {}
