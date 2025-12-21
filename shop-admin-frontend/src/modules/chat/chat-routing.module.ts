import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from '../dashboard/components'
import { AppGuard } from 'app/app.guard'
import { ChatComponent } from './components'

const routes: Routes = [
	{
		path: '',
		component: ChatComponent,
		canActivate: [AppGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChatRoutingModule {}
