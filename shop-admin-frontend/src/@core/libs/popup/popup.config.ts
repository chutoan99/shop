import { InjectionToken } from '@angular/core'

export interface PopupConfig<D = any> {
	width?: string
	height?: string
	hasBackdrop?: boolean
	backdropClass?: string
	panelClass?: string
	data?: D
}

export enum StatePopup {
	confirmed = 'confirmed',
	cancelled = 'cancelled'
}

export const POPUP_DATA = new InjectionToken<any>('POPUP_DATA')
