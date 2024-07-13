import { Component, Input } from '@angular/core'
import { navigation } from 'src/utils/navs'
import { logoApp } from 'src/utils/orthers'

@Component({
	selector: 'app-ship-route-info',
	templateUrl: './ship-route-info.component.html',
	styleUrls: ['./ship-route-info.component.scss']
})
export class ShipRouteInfoComponent {
	@Input() border: boolean = false
	navigation: any = navigation
	logoApp: any = logoApp
}
