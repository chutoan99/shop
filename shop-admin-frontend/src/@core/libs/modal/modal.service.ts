import { Injectable, Injector, ComponentRef, EnvironmentInjector, Type } from '@angular/core'
import { Overlay, OverlayConfig } from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal'
import { ModalRef } from './modal-ref'
import { MODAL_DATA, ModalConfig } from './modal.config'

@Injectable({ providedIn: 'root' })
export class ModalService {
	constructor(
		private overlay: Overlay,
		private injector: Injector,
		private envInjector: EnvironmentInjector
	) {}

	open<T, D = unknown, R = unknown>(component: Type<T>, config: ModalConfig = {}): ModalRef<T, R> {
		const overlayRef = this.overlay.create(this._getOverlayConfig(config))

		const modalRef = new ModalRef<T, R>(overlayRef, {} as T)

		const injector = this._createInjector(modalRef, config.data)

		const portal = new ComponentPortal(component, null, injector, this.envInjector)
		const componentRef: ComponentRef<T> = overlayRef.attach(portal)
		modalRef.componentInstance = componentRef.instance

		return modalRef
	}

	private _getOverlayConfig(config: ModalConfig): OverlayConfig {
		return new OverlayConfig({
			hasBackdrop: config.hasBackdrop ?? true,
			backdropClass: config.backdropClass ?? 'cdk-overlay-dark-backdrop',
			panelClass: config.panelClass,
			width: config.width ?? 'auto',
			height: config.height ?? 'auto',
			positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
		})
	}

	private _createInjector<T, D>(modalRef: ModalRef<T>, data: D | undefined): Injector {
		return new PortalInjector(
			this.injector,
			new WeakMap<any, any>([
				[ModalRef, modalRef],
				[MODAL_DATA, data]
			])
		)
	}
}
