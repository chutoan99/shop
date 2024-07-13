import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

// các pages
import { ProductComponent } from 'src/pages/product/product.component'
import { HomeComponent } from '../pages/home/home.component'
import { ChatComponent } from '../pages/chat/chat.component'
import { CommentComponent } from 'src/pages/comment/comment.component'
import { ShipRouteComponent } from 'src/pages/ship-route/ship-route.component'
import { OrderComponent } from 'src/pages/order/order.component'
import { environment } from 'src/environments/environment'
import { AppGuard } from 'src/app/app.guard'
import { SettingComponent } from 'src/pages/setting/setting.component'
import { UserComponent } from 'src/pages/user/user.component'

import { DefaultComponent } from 'src/layouts/default/default.component'
import { CustomLayoutComponent } from 'src/layouts/custom/custom.component'
import { LoginComponent } from 'src/pages/auth/modules/login/components/login.component'
const routes: Routes = [
	{
		path: 'index',
		component: DefaultComponent,
		children: [
			{
				path: '',
				component: CustomLayoutComponent,
				canActivate: [AppGuard]
			}
		]
	},
	{
		path: '',
		component: DefaultComponent,
		children: [
			{
				path: '',
				component: HomeComponent,
				canActivate: [AppGuard]
			},

			{
				path: 'chat',
				component: ChatComponent,
				canActivate: [AppGuard]
			},
			{
				path: 'products',
				canActivate: [AppGuard],
				children: [
					{
						path: '',
						component: ProductComponent
					}
				]
			},

			{
				path: 'comments',
				component: CommentComponent,
				canActivate: [AppGuard]
			},
			{
				path: 'orders',
				component: OrderComponent,
				canActivate: [AppGuard]
			},

			{
				path: 'settings',
				component: SettingComponent,
				canActivate: [AppGuard]
			},
			{
				path: 'ships',
				component: ShipRouteComponent,
				canActivate: [AppGuard]
			},
			{
				path: 'user',
				component: UserComponent,
				canActivate: [AppGuard]
			}
		]
	},
	{
		path: 'login',
		component: LoginComponent
	}
]

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: !environment.production })],
	exports: [RouterModule]
})
export class RoutingModule {}
