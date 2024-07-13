import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ShipRouteComponent } from './ship-route.component'
import { RouterModule } from '@angular/router'
import { ShipRouteInfoComponent } from './components/info/ship-route-info.component'

@NgModule({
	declarations: [ShipRouteComponent, ShipRouteInfoComponent],
	imports: [CommonModule, RouterModule, HttpClientModule, BrowserModule, FormsModule]
})
export class ShipRouteModule {}
