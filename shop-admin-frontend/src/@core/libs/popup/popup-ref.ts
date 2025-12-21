import { OverlayRef } from '@angular/cdk/overlay'
import { Subject } from 'rxjs'

export class PopupRef<T = any, R = any> {
	private readonly _afterClosed = new Subject<R | undefined>()

	constructor(
		private overlayRef: OverlayRef,
		public componentInstance: T
	) {}

	close(result?: R): void {
		this.overlayRef.dispose()
		this._afterClosed.next(result)
		this._afterClosed.complete()
	}

	afterClosed() {
		return this._afterClosed.asObservable()
	}
}
