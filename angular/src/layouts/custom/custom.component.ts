import { Component, OnInit, Inject } from '@angular/core'

import { DOCUMENT } from '@angular/common'
@Component({
	selector: 'app-layout-custom',
	templateUrl: './custom.component.html',
	styleUrls: ['./custom.component.scss']
})
export class CustomLayoutComponent implements OnInit {
	isWide: boolean = false
	menuLinks: string[] = ['Apps', 'Your work', 'Discover', 'Market']
	isLightMode: boolean = false

	toggleLightMode() {
		this.document.body.classList.toggle('light-mode')
	}
	onFocus() {
		this.isWide = true
	}

	onBlur() {
		this.isWide = false
	}
	constructor(@Inject(DOCUMENT) private document: Document) {}
	ngOnInit(): void {}
}
