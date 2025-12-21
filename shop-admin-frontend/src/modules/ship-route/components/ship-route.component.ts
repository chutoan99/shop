import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NAVIGATION } from '@core/resources/navigation.resource'
import { LOGO_APP } from '@core/resources/others.resource'
import { ShipRouteInfoComponent } from './ship-route-info.component'

@Component({
	selector: 'app-ship-route',
	templateUrl: '../templates/ship-route.template.html',
	styleUrls: ['../styles/ship-route.style.scss'],
	host: {
		'[class.app-ship-route]': 'true'
	},
	imports: [CommonModule, RouterModule, ShipRouteInfoComponent]
})
export class ShipRouteComponent {
	protected readonly navigation: any[] = NAVIGATION
	protected readonly logoApp: string = LOGO_APP
}
