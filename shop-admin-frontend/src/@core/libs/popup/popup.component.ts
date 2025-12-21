import { AfterViewInit, Component, ComponentRef, Inject, Input, Type, ViewChild, ViewContainerRef } from '@angular/core'
import { PopupRef } from './popup-ref'
import { POPUP_DATA } from './popup.config'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-popup',
	templateUrl: './popup.template.html',
	standalone: true,
	imports: [CommonModule]
})
export class PopupComponent implements AfterViewInit {
	@ViewChild('popupContent', { read: ViewContainerRef }) contentRef!: ViewContainerRef
	private childComponentType!: Type<any>

	constructor(
		private readonly _popupRef: PopupRef,
		@Inject(POPUP_DATA) public data: any
	) {}

	public setChildComponent(component: Type<any>): void {
		this.childComponentType = component
	}

	ngAfterViewInit(): void {
		if (this.childComponentType && this.contentRef.length === 0) {
			this.contentRef.createComponent(this.childComponentType)
		}
	}

	confirm() {
		this._popupRef.close('confirmed')
	}

	cancel() {
		this._popupRef.close('cancelled')
	}
}
