import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NAVIGATION } from '@core/resources/navigation.resource'
import { LOGO_APP } from '@core/resources/others.resource'
@Component({
	selector: 'app-ship-route-info',
	templateUrl: '../templates/ship-route-info.template.html',
	styleUrls: ['../styles/ship-route-info.style.scss'],
	host: {
		'[class.app-ship-route-info]': 'true'
	},
	imports: [CommonModule, RouterModule]
})
export class ShipRouteInfoComponent {
	@Input() public border: boolean = false
	protected readonly navigation: any[] = NAVIGATION
	protected readonly logoApp: string = LOGO_APP
}
