import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from '../dashboard/components'
import { AppGuard } from 'app/app.guard'
import { StoreComponent } from './components/store-config.components'

const routes: Routes = [
	{
		path: '',
		component: StoreComponent,
		canActivate: [AppGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StoreConfigRoutingModule {}
