import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { INavigation, NAVIGATION } from '@core/resources/navigation.resource'

@Component({
	selector: 'app-aside',
	templateUrl: './aside.template.html',
	styleUrls: ['./aside.style.scss'],
	host: {
		'[class.app-aside]': 'true'
	},
	imports: [CommonModule, RouterModule]
})
export class AsideComponent {
	@Input() public collapsed: boolean = false
	protected readonly navigation: INavigation[] = NAVIGATION
	protected currentRoute: string = ''

	constructor(private router: Router) {
		this.setCurrentRoute(this.router.url)

		this.router.events.subscribe(() => {
			this.setCurrentRoute(this.router.url)
		})

		console.log(this.currentRoute, 'this.currentRoutethis.currentRoute')
	}

	private setCurrentRoute(url: string) {
		this.currentRoute = url.split('?')[0]
	}
}
