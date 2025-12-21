import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { StoreConfigComponent } from '@core/libs/form-builder/components/store-config.components'
import { NAVIGATION } from '@core/resources/navigation.resource'
import { LOGO_APP } from '@core/resources/others.resource'

@Component({
	selector: 'app-store',
	templateUrl: '../templates/store-config.template.html',
	styleUrls: ['../styles/store-config.style.scss'],
	host: {
		'[class.app-store]': 'true'
	},
	imports: [CommonModule, RouterModule, StoreConfigComponent]
})
export class StoreComponent {
	protected readonly navigation: any[] = NAVIGATION
	protected readonly logoApp: string = LOGO_APP
}
