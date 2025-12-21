import { Routes } from '@angular/router'
import { LoginComponent } from '@modules/auth/login/components'
import { DefaultLayoutComponent } from '@layouts/index'
import { AuthLayoutComponent } from '@layouts/auth/auth-layout.component'

export const routes: Routes = [
	{
		path: '',
		component: DefaultLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () =>
					import('@modules/dashboard/dashboard-routing.module').then((m) => m.DashboardRoutingModule)
			},
			{
				path: 'products',
				loadChildren: () =>
					import('@modules/product/product-routing.module').then((m) => m.ProductRoutingModule)
			},
			{
				path: 'chat',
				loadChildren: () => import('@modules/chat/chat-routing.module').then((m) => m.ChatRoutingModule)
			},
			{
				path: 'ships',
				loadChildren: () =>
					import('@modules/ship-route/ship-route-routing.module').then((m) => m.ShipRouteRoutingModule)
			},
			{
				path: 'store-config',
				loadChildren: () =>
					import('@modules/store-config/store-config-routing.module').then((m) => m.StoreConfigRoutingModule)
			},
			{
				path: 'system-management',
				loadChildren: () =>
					import('@modules/system-management/system-management-routing.module').then(
						(m) => m.SystemManagementRoutingModule
					)
			}
		]
	},
	{
		path: 'login',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				component: LoginComponent
			}
		]
	}
]
