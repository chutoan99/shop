import { InjectionToken } from '@angular/core'

export interface ModalConfig {
	width?: string
	height?: string
	hasBackdrop?: boolean
	backdropClass?: string
	panelClass?: string
	data?: {
		message?: string
		content?: string
		cancelLabel?: string
		confirmLabel?: string
		action: 'delete' | 'sign_out'
	}
}

export enum StateModal {
	confirmed = 'confirmed',
	cancelled = 'cancelled'
}

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA')
