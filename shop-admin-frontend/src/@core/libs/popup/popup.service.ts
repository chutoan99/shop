import { Injectable, Injector, ComponentRef, EnvironmentInjector, Type } from '@angular/core'
import { Overlay, OverlayConfig } from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal'
import { POPUP_DATA, PopupConfig } from './popup.config'
import { PopupRef } from './popup-ref'
import { PopupComponent } from './popup.component'

@Injectable({ providedIn: 'root' })
export class PopupService {
	constructor(
		private overlay: Overlay,
		private injector: Injector,
		private envInjector: EnvironmentInjector
	) {}

	open<T, D = unknown, R = unknown>(childComponent: Type<T>, config: PopupConfig<D> = {}): PopupRef<T, R> {
		const overlayRef = this.overlay.create(this._getOverlayConfig(config))
		const popupRef = new PopupRef<T, R>(overlayRef, {} as T)

		const injector = this._createInjector(popupRef, config.data)
		const portal = new ComponentPortal(PopupComponent, null, injector, this.envInjector)
		const popupComponentRef = overlayRef.attach(portal)

		// Gán component vào sau khi attach shell
		const instance = popupComponentRef.instance
		if (instance instanceof PopupComponent) {
			instance.setChildComponent(childComponent)
		}

		return popupRef
	}

	private _getOverlayConfig(config: PopupConfig): OverlayConfig {
		return new OverlayConfig({
			hasBackdrop: config.hasBackdrop ?? true,
			backdropClass: config.backdropClass ?? 'cdk-overlay-dark-backdrop',
			panelClass: config.panelClass,
			width: config.width ?? 'auto',
			height: config.height ?? 'auto',
			positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
		})
	}

	private _createInjector<T, D>(popupRef: PopupRef<T>, data: D | undefined): Injector {
		return new PortalInjector(
			this.injector,
			new WeakMap<any, any>([
				[PopupRef, popupRef],
				[POPUP_DATA, data]
			])
		)
	}
}
