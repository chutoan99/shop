import { Component } from '@angular/core'
import { navigation } from 'src/utils/navs'
import { logoApp } from 'src/utils/orthers'

@Component({
	selector: 'app-ship-route',
	templateUrl: './ship-route.component.html',
	styleUrls: ['./ship-route.component.scss']
})
export class ShipRouteComponent {
	navigation: any = navigation
	logoApp: any = logoApp
}
