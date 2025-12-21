import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductComponent } from './components'
import { AppGuard } from 'app/app.guard'
import { ProductResolver } from './resolvers/product.resolver'

const routes: Routes = [
	{
		path: '',
		component: ProductComponent,
		canActivate: [AppGuard],
		resolve: {
			products: ProductResolver
		}
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
